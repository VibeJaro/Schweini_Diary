import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config.js';
import { marked } from 'https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js';

const feedContainer = document.getElementById('feed-container');
const configWarning = document.getElementById('config-warning');
const identityModal = document.getElementById('identity-modal');
const identityChoices = document.getElementById('identity-choices');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const identities = [
  { name: 'Elisa', emoji: '👱‍♀️', color: 'bg-teal-50 border-teal-200 text-teal-800' },
  { name: 'Mama', emoji: '👩🏽', color: 'bg-pink-50 border-pink-200 text-pink-700' },
  { name: 'Papa', emoji: '🧔', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'Oma', emoji: '👵', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { name: 'Opa', emoji: '👴', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { name: 'Wonkel', emoji: '🤠', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
  { name: 'Schweini', emoji: '🐷', color: 'bg-teal-50 border-teal-200 text-teal-700' }
];

let supabaseClient = null;
let pendingComment = null;
let entriesState = [];

marked.setOptions({ breaks: true });

function lucideRefresh() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
}

function formatDateLabel(entry) {
  if (entry.date_label) return entry.date_label;
  try {
    return new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(entry.created_at));
  } catch (e) {
    return 'Gerade eben';
  }
}

function renderIdentityModal() {
  identityChoices.innerHTML = identities.map((identity) => `
    <button data-identity="${identity.name}" class="${identity.color} p-3 rounded-xl border-2 flex flex-col items-center gap-1 hover:scale-[1.02] transition btn-press">
      <span class="text-2xl">${identity.emoji}</span>
      <span class="font-hand font-bold">${identity.name}</span>
    </button>
  `).join('');
}

function showConfigMissing() {
  configWarning?.classList.remove('hidden');
  feedContainer.innerHTML = `
    <div class="bg-white rounded-2xl border-2 border-amber-300 p-6 chaos-shadow">
      <p class="text-lg font-hand font-bold text-amber-700 mb-2">Das Chaos-Funkgerät schnarcht!</p>
      <p class="text-gray-700">Gerade gibt es keinen Kontakt zur Schweini-Cloud. Versuch es später noch einmal oder weck das Funkgerät auf.</p>
    </div>
  `;
  lucideRefresh();
}

function getSupabaseClient() {
  const missing = !SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_SUPABASE') || SUPABASE_ANON_KEY.includes('YOUR_SUPABASE');
  if (missing) {
    showConfigMissing();
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

async function loadFeed(showLoader = true) {
  if (!supabaseClient) return;
  if (showLoader) {
    feedContainer.innerHTML = `<div class="flex items-center gap-3 text-gray-500"><i data-lucide="loader" class="w-5 h-5 animate-spin"></i><span>Einträge werden geladen...</span></div>`;
    lucideRefresh();
  }

  const { data: entries, error: entryError } = await supabaseClient
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (entryError) {
    feedContainer.innerHTML = `<div class="text-red-600">${entryError.message}</div>`;
    return;
  }

  const entryIds = entries.map((e) => e.id);
  const commentsByEntry = {};
  const reactionCounts = {};

  if (entryIds.length) {
    const { data: comments } = await supabaseClient
      .from('comments')
      .select('*')
      .in('entry_id', entryIds)
      .order('created_at', { ascending: true });

    comments?.forEach((c) => {
      commentsByEntry[c.entry_id] = commentsByEntry[c.entry_id] || [];
      commentsByEntry[c.entry_id].push(c);
    });

    const { data: reactions } = await supabaseClient
      .from('reactions')
      .select('entry_id, emoji');

    reactions?.forEach((r) => {
      const key = `${r.entry_id}-${r.emoji}`;
      reactionCounts[key] = (reactionCounts[key] || 0) + 1;
    });
  }

  entriesState = entries.map((entry) => ({
    ...entry,
    comments: commentsByEntry[entry.id] || [],
    reactions: reactionCounts,
  }));

  renderFeed(entriesState);
}

function renderFeed(entries) {
  if (!entries.length) {
    feedContainer.innerHTML = `
      <div class="bg-white rounded-2xl border-2 border-dashed border-teal-200 p-6 text-center">
        <p class="text-lg font-hand text-teal-700 font-bold">Noch nichts passiert 🙈</p>
        <p class="text-gray-600">Frag Schweini, wann die nächsten Abenteuer eintreffen.</p>
      </div>
    `;
    lucideRefresh();
    return;
  }

  feedContainer.innerHTML = entries.map((entry) => renderEntry(entry)).join('');
  lucideRefresh();
}

function renderEntry(entry) {
  const emojiOptions = ['🐷', '🤣', '🤦‍♀️', '💩'];
  const counts = (emoji) => entry.reactions?.[`${entry.id}-${emoji}`] || 0;
  const images = Array.isArray(entry.images) ? entry.images.filter(Boolean) : [];
  const bodyHtml = marked.parse(entry.body || '');

  return `
    <article class="bg-white rounded-2xl chaos-shadow border-2 border-teal-500 overflow-hidden relative" id="post-${entry.id}">
      <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-40 h-8 tape rotate-1 z-10 opacity-90"></div>
      <div class="p-6 pt-8 pb-4">
        <div class="flex flex-wrap justify-between items-center mb-4 font-hand font-bold text-lg gap-2">
          <span class="text-teal-600 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 transform -rotate-1">${formatDateLabel(entry)}</span>
          <span class="text-yellow-700 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-200 transform rotate-2">${entry.mood || 'Neugierig 🐷'}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <i data-lucide="pen" class="w-4 h-4"></i>
          <span>${entry.author || 'Schweini'}</span>
        </div>
        <h3 class="text-2xl font-hand font-bold text-gray-800 mb-3 leading-tight">${entry.title || 'Ohne Titel'}</h3>
        <div class="prose prose-teal max-w-none text-gray-700 leading-relaxed text-[1.05rem]">${bodyHtml}</div>
      </div>
      ${renderImages(images)}
      <div class="bg-gray-50 p-4 border-t-2 border-teal-100">
        <div class="flex flex-wrap gap-2 mb-4">
          ${emojiOptions.map((emoji) => renderReactionBtn(entry.id, emoji, counts(emoji))).join('')}
        </div>
        <div class="space-y-3" id="comments-area-${entry.id}">
          ${(entry.comments || []).map((c) => renderCommentHtml(c.author, c.body)).join('')}
        </div>
        <form class="mt-4 flex gap-2 relative comment-form" data-entry-id="${entry.id}">
          <input type="text" name="text" placeholder="Antworte Schweini..." autocomplete="off" class="w-full bg-white border-2 border-teal-200 rounded-full px-4 py-2 pr-12 focus:outline-none focus:border-teal-500 font-hand text-lg placeholder:text-gray-400" />
          <button type="submit" class="absolute right-1 top-1 bottom-1 bg-teal-500 text-white w-10 rounded-full flex items-center justify-center hover:bg-teal-600 transition btn-press">
            <i data-lucide="send" class="w-4 h-4 ml-0.5"></i>
          </button>
        </form>
      </div>
    </article>
  `;
}

function renderImages(images) {
  if (!images.length) return '';
  const gridClass = images.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
  const cards = images
    .map((src) => `
      <div class="aspect-square relative group overflow-hidden rounded-xl border-2 border-gray-100 cursor-pointer" data-lightbox-src="${src}">
        <img src="${src}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-1" alt="Foto" loading="lazy" />
      </div>
    `)
    .join('');
  return `<div class="px-3 pb-3"><div class="grid ${gridClass} gap-2">${cards}</div></div>`;
}

function renderReactionBtn(id, emoji, count = 0) {
  return `
    <button data-reaction="${emoji}" data-entry="${id}" class="btn-press flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-teal-100 shadow-sm hover:border-teal-300 transition select-none">
      <span class="text-xl leading-none filter drop-shadow-sm">${emoji}</span>
      <span class="font-hand font-bold text-teal-600 count-val">${count > 0 ? count : ''}</span>
    </button>
  `;
}

function renderCommentHtml(name, text) {
  let borderClass = 'border-teal-300';
  let bgDot = 'bg-teal-500';
  let nameColor = 'text-teal-600';
  if (name === 'Mama') { borderClass = 'border-pink-300'; bgDot = 'bg-pink-500'; nameColor = 'text-pink-600'; }
  if (name === 'Papa') { borderClass = 'border-blue-300'; bgDot = 'bg-blue-500'; nameColor = 'text-blue-600'; }
  if (name === 'Wonkel') { borderClass = 'border-yellow-300'; bgDot = 'bg-yellow-500'; nameColor = 'text-yellow-700'; }
  if (name?.startsWith('O')) { borderClass = 'border-purple-300'; bgDot = 'bg-purple-500'; nameColor = 'text-purple-600'; }
  return `
    <div class="bg-white p-3 rounded-xl border ${borderClass} text-sm shadow-sm relative ml-2">
      <div class="absolute w-3 h-3 ${bgDot} rounded-full -left-4 top-4 border border-white shadow-sm"></div>
      <span class="font-hand font-bold ${nameColor} text-base mr-1">${name || 'Schweini'}:</span>
      <span class="text-gray-700">${text}</span>
    </div>
  `;
}

function openIdentityModal(commentData) {
  pendingComment = commentData;
  identityModal.classList.remove('hidden');
}

async function handleCommentSubmit(form) {
  const text = form.text.value.trim();
  if (!text) return;
  openIdentityModal({ entryId: form.dataset.entryId, text, inputField: form.text });
}

async function saveComment(identity) {
  if (!pendingComment) return;
  const { entryId, text, inputField } = pendingComment;
  const payload = { entry_id: entryId, author: identity, body: text };
  const { error } = await supabaseClient.from('comments').insert(payload);
  if (error) {
    alert('Kommentar konnte nicht gespeichert werden: ' + error.message);
    return;
  }
  const entry = entriesState.find((e) => e.id === entryId);
  if (entry) {
    entry.comments = entry.comments || [];
    entry.comments.push({ ...payload });
    renderFeed(entriesState);
  }
  inputField.value = '';
  identityModal.classList.add('hidden');
  pendingComment = null;
}

async function handleReaction(entryId, emoji, btn) {
  const { error } = await supabaseClient.from('reactions').insert({ entry_id: entryId, emoji });
  if (error) {
    alert('Reaktion konnte nicht gespeichert werden: ' + error.message);
    return;
  }
  const entry = entriesState.find((e) => e.id === entryId);
  if (!entry.reactions) entry.reactions = {};
  const key = `${entryId}-${emoji}`;
  entry.reactions[key] = (entry.reactions[key] || 0) + 1;
  const counter = btn.querySelector('.count-val');
  counter.textContent = entry.reactions[key] || '';
  btn.classList.add('bg-teal-50', 'border-teal-400');
  setTimeout(() => btn.classList.remove('bg-teal-50', 'border-teal-400'), 200);
}

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  setTimeout(() => {
    lightboxImg.classList.remove('scale-95', 'opacity-0');
    lightboxImg.classList.add('scale-100', 'opacity-100');
  }, 10);
}

function registerEventListeners() {
  feedContainer.addEventListener('submit', (event) => {
    if (event.target.matches('.comment-form')) {
      event.preventDefault();
      handleCommentSubmit(event.target);
    }
  });

  feedContainer.addEventListener('click', (event) => {
    const reactionBtn = event.target.closest('[data-reaction]');
    if (reactionBtn) {
      const entryId = reactionBtn.dataset.entry;
      const emoji = reactionBtn.dataset.reaction;
      handleReaction(entryId, emoji, reactionBtn);
      return;
    }
    const imageCard = event.target.closest('[data-lightbox-src]');
    if (imageCard) {
      openLightbox(imageCard.dataset.lightboxSrc);
    }
  });

  identityChoices.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-identity]');
    if (btn) saveComment(btn.dataset.identity);
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.closest('button')) {
      lightboxImg.classList.remove('scale-100', 'opacity-100');
      lightboxImg.classList.add('scale-95', 'opacity-0');
      setTimeout(() => lightbox.classList.add('hidden'), 300);
    }
  });
}

function init() {
  renderIdentityModal();
  registerEventListeners();
  lucideRefresh();

  document.querySelector('#identity-modal button')?.addEventListener('click', () => {
    pendingComment = null;
  });

  supabaseClient = getSupabaseClient();
  if (!supabaseClient) return;

  loadFeed();
}

document.addEventListener('DOMContentLoaded', init);
