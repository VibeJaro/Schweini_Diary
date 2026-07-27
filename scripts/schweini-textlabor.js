import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, '.env.local');
const biblePath = resolve(projectRoot, 'content', 'schweini-bibel.md');
const examplesPath = resolve(projectRoot, 'content', 'schweini-beispiele.md');
const outputDir = resolve(projectRoot, '.schweini-lab');

function parseEnv(text) {
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const separator = line.indexOf('=');
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
        return [key, value];
      }),
  );
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function safeTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function formatCost(cost) {
  const numericCost = Number(cost);
  if (!Number.isFinite(numericCost)) return 'nicht gemeldet';
  if (numericCost === 0) return '$0.000000 (kostenlos)';
  return `$${numericCost.toFixed(6)}`;
}

function usageLine(usage) {
  if (!usage) return 'Kosten: nicht gemeldet';
  const promptTokens = usage.prompt_tokens ?? usage.input_tokens ?? '?';
  const completionTokens = usage.completion_tokens ?? usage.output_tokens ?? '?';
  return `Kosten: ${formatCost(usage.cost)} · Input: ${promptTokens} Token · Output: ${completionTokens} Token`;
}

function modelError(message, payload = {}) {
  const error = new Error(message);
  error.usage = payload.usage || null;
  error.generationId = payload.id || null;
  error.finishReason = payload?.choices?.[0]?.finish_reason || null;
  return error;
}

async function loadPrompt() {
  const directPrompt = readArgument('--prompt');
  const promptFile = readArgument('--prompt-file');

  if (directPrompt) return directPrompt.trim();
  if (promptFile) return (await readFile(resolve(projectRoot, promptFile), 'utf8')).trim();

  throw new Error(
    'Bitte einen Auftrag mit --prompt "..." oder --prompt-file datei.txt angeben.',
  );
}

async function askModel({ apiKey, model, prompt, styleGuide, examples, maxTokens }) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(120_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://schweini-diary.vercel.app/',
      'X-Title': 'Schweinis Textlabor',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: [
            'Du schreibst für Schweinis Welt. Halte dich genau an die Stilgrundlage.',
            'Gib ausschließlich den fertigen Text aus, ohne Vorbemerkung oder Analyse.',
            'Übernimm aus den Beispielen nur den Stil, niemals Personen oder Ereignisse.',
            'Elisa oder andere Familienmitglieder dürfen nur vorkommen, wenn der aktuelle Auftrag sie nennt.',
            '',
            styleGuide,
            '',
            examples,
          ].join('\n'),
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      reasoning: {
        effort: 'minimal',
        exclude: true,
      },
      max_tokens: maxTokens,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw modelError(
      payload?.error?.message || `OpenRouter-Fehler ${response.status}`,
      payload,
    );
  }

  const text = payload?.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw modelError('Das Modell hat keinen Text zurückgegeben.', payload);
  }

  return {
    requestedModel: model,
    returnedModel: payload.model || model,
    text,
    usage: payload.usage || null,
    generationId: payload.id || null,
    finishReason: payload?.choices?.[0]?.finish_reason || null,
  };
}

async function main() {
  const env = parseEnv(await readFile(envPath, 'utf8'));
  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENROUTER_API_KEY fehlt. Bitte den Schlüssel in .env.local eintragen.',
    );
  }

  const prompt = await loadPrompt();
  const styleGuide = await readFile(biblePath, 'utf8');
  const examples = await readFile(examplesPath, 'utf8');
  const modelOverride = readArgument('--models');
  const maxTokens = Number(readArgument('--max-tokens') || 2400);
  const models = (modelOverride || env.OPENROUTER_MODELS || '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  if (!models.length) {
    throw new Error('Es wurden keine OpenRouter-Modelle konfiguriert.');
  }
  if (!Number.isInteger(maxTokens) || maxTokens < 256 || maxTokens > 12000) {
    throw new Error('--max-tokens muss eine ganze Zahl zwischen 256 und 12000 sein.');
  }

  console.log(`Schweinis Textlabor fragt ${models.length} Modelle …`);

  const settled = await Promise.allSettled(
    models.map((model) =>
      askModel({ apiKey, model, prompt, styleGuide, examples, maxTokens }),
    ),
  );

  const results = settled.map((result, index) =>
    result.status === 'fulfilled'
      ? { ok: true, ...result.value }
      : {
          ok: false,
          requestedModel: models[index],
          error: result.reason.message,
          usage: result.reason.usage || null,
          generationId: result.reason.generationId || null,
          finishReason: result.reason.finishReason || null,
        },
  );

  await mkdir(outputDir, { recursive: true });
  const timestamp = safeTimestamp();
  const jsonPath = resolve(outputDir, `${timestamp}.json`);
  const markdownPath = resolve(outputDir, `${timestamp}.md`);
  const totalCost = results.reduce(
    (sum, result) => sum + (Number(result.usage?.cost) || 0),
    0,
  );

  const markdown = [
    '# Schweinis Textlabor',
    '',
    `**Gesamtkosten:** ${formatCost(totalCost)}`,
    '',
    '## Auftrag',
    '',
    prompt,
    '',
    ...results.flatMap((result, index) => [
      `## Variante ${index + 1} – ${result.requestedModel}`,
      '',
      result.ok
        ? `**${usageLine(result.usage)}${result.finishReason === 'length' ? ' · Antwort abgeschnitten' : ''}**`
        : `**${usageLine(result.usage)} · Anfrage fehlgeschlagen**`,
      '',
      result.ok ? result.text : `Fehler: ${result.error}`,
      '',
    ]),
  ].join('\n');

  await writeFile(
    jsonPath,
    JSON.stringify({ createdAt: new Date().toISOString(), prompt, results }, null, 2),
    'utf8',
  );
  await writeFile(markdownPath, markdown, 'utf8');

  console.log(markdown);
  console.log(`\nLokal gespeichert: ${markdownPath}`);

  if (!results.some((result) => result.ok)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`Textlabor konnte nicht starten: ${error.message}`);
  process.exitCode = 1;
});
