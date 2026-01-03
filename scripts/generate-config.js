// Writes config.js from environment variables during Vercel build.
// Expected vars: SUPABASE_URL, SUPABASE_ANON_KEY

import { writeFileSync } from 'node:fs';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.');
  process.exit(1);
}

const content = `export const SUPABASE_URL = '${SUPABASE_URL}';\nexport const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';\n`;

writeFileSync(new URL('../config.js', import.meta.url), content);
console.log('config.js created from environment variables.');
