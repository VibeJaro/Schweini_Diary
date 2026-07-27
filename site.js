import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config.js";

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const menuSheet = document.querySelector("#menu-sheet");
const menuToggle = document.querySelector(".menu-toggle");
const postDialog = document.querySelector("#post-dialog");
const postForm = document.querySelector("#family-post-form");
const uploadPreview = document.querySelector("#upload-preview");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");

const identities = {
  Elisa: "E",
  Sonni: "S",
  Flori: "F",
  Mama: "M",
  Papa: "P",
  Oma: "O",
  Opa: "O",
  Wonkel: "W",
  Schweini: "🐷",
};

const fallbackEntries = [
  {
    id: "d66f74c7-14d4-4bf9-9c4e-b1fbfd76ac8f",
    title: "Auf Geschäftsreise",
    mood: "Bei der Arbeit!",
    date_label: "24.02.2026 · 18:15",
    author: "Schweini",
    created_at: "2026-02-24T17:14:43.70507+00:00",
    images: Array.from({ length: 6 }, (_, index) => `public/images/10_${index + 1}.png`),
    body: `Ich bin’s wieder! Du dachtest doch nicht im Ernst, ich bleibe ewig nur zu Hause auf dem Sofa, oder? Pah! Ein Star wie ich muss in die Welt hinaus. Und genau das ist heute passiert: Dein Alter hat mich auf einen richtig wichtigen Workshop mitgenommen.

**Copilot Schweini im Einsatz**

Es fing schon fantastisch an: Ich durfte VORNE sitzen. Ich habe natürlich sofort die Rolle des Chef-Navigators übernommen. Dein Papa meinte irgendwann, ich solle mit meiner Schnauze nicht dauernd die Radiosender verstellen. Aber eine epische Reise braucht nun mal den perfekten Soundtrack!

**Mein großer Auftritt**

Beim Workshop war ich zunächst inkognito in der Tasche. Als vorne jemand geredet hat, dachte ich mir: Das kann ich besser. Also bin ich auf den Präsentationstisch geplumpst — genau auf die Laptop-Tastatur. Zack, zehn Folien weiter. Perfektes Timing.

**Das Buffet: mein eigentliches Meisterwerk**

Bei jeder Pause gab es Süßkram. Ich habe mich heldenhaft geopfert und die kleinen Schokostücke aus den Keksen gerettet. Abends gab es Kuchen, Eis und noch mehr Kuchen. Jetzt liege ich im Hotelbett. Mein Bauch ist so kugelrund, dass ich aufpassen muss, beim Umdrehen nicht aus dem Bett zu rollen.

Gute Nacht, liebes Tagebuch!

Dein sehr berühmtes und noch viel sattgemampfteres Schweini 🐷🎤🍩`,
  },
  {
    id: "207999d0-4b2a-4430-a693-7f4909aafe37",
    title: "Elisa!!!!",
    mood: "😍 Elisavorfreude 😍",
    date_label: "20.02.2026 · 09:05",
    author: "Schweini",
    created_at: "2026-02-20T08:01:22.176362+00:00",
    images: Array.from({ length: 8 }, (_, index) => `public/images/9_${index + 1}.png`),
    body: `Ich habe heute Morgen über meine ganzen Pläne nachgedacht. Astronaut, Model, Filmstar … Weißt du was? Ich lasse das. Diese Agenten und Manager sind Banausen! Außerdem passiert heute das Wichtigste überhaupt: **Elisa kommt endlich wieder nach Hause!**

Alles muss perfekt sein. Also habe ich beschlossen, den Haushalt zu schmeißen. Ich bin ja nicht nur schön, sondern auch praktisch veranlagt.

**Die große Putz-Aktion**

Zuerst habe ich mit dem Staubsauger gekämpft. Das Ding ist wie ein wildes Monster, aber ich habe es gebändigt. Danach war das Badezimmer dran. Das Waschbecken strahlt jetzt wie neu. Über meine Spezialbürste sprechen wir lieber ein anderes Mal.

**Die Willkommens-Torte**

Auf dem Tisch steht ein Turm aus Freude: Sahne, Nüsse, Gummibärchen, M&Ms und ein Wasserfall aus Schokosoße. Sehr ausgewogen. Ich habe vorsichtshalber schon probiert.

Jetzt sitzen alle Kuscheltiere im Flur und warten auf das Klicken der Tür. Berühmt sein ist vielleicht cool, aber bei Elisa im Arm zu liegen, ist viel besser als jeder Pokal.

Dein sehr sauberer und hungriger Schweini 🐷❤️🍰`,
  },
  {
    id: "15072668-5746-4c39-926c-4b975ebbbcc0",
    title: "Schweini Superstar",
    mood: "😎 Endlich berühmt! 😎",
    date_label: "18.02.2026 · 18:54",
    author: "Schweini",
    created_at: "2026-02-18T17:55:47.655717+00:00",
    images: Array.from({ length: 13 }, (_, index) => `public/images/8_${index + 1}.png`),
    body: `Nachdem die Weltraum-Nummer gestern wortwörtlich in die Hose ging, wusste ich sofort: Ich gehöre nicht zu den Sternen am Himmel, sondern zu den Stars auf der Erde.

**Ich werde Schauspieler!**

Ich bin nach Hollywood gedüst und habe alles gespielt: den superharten Action-Helden, den akrobatischen Kugel-Ausweicher, einen französischen Schwarz-Weiß-Künstler und natürlich den Superschurken mit weißer Plüschkatze. Mein Talent ist unfassbar.

Dann kam die große Preisverleihung. Tausende Kameras blitzten. Ich hielt den goldenen Pokal in die Höhe und hielt die beste Rede aller Zeiten — ich habe mir vor Rührung selbst gedankt.

Zum Schluss bekam ich meinen eigenen Stern. Ich warf mich darauf und umarmte ihn. Er war so schön kühl und weich …

Moment. Weich?

Ich lag in meinem Bett und umarmte mein Kopfkissen. Alles nur ein Traum. Aber in meinem Kopf habe ich gerade den besten Film aller Zeiten gedreht.

Film ab! Dein Superstar Schweini 🐷🎬🏆`,
  },
  {
    id: "58333d33-b1c4-41d0-a1fe-9ef10e6d45c0",
    title: "Schweini im Weltall",
    mood: "🚀 Auf zu den Sternen 🚀",
    date_label: "17.02.2026 · 18:00",
    author: "Schweini",
    created_at: "2026-02-17T16:52:58.874972+00:00",
    images: Array.from({ length: 10 }, (_, index) => `public/images/7_${index + 1}.png`),
    body: `Die Welt ist noch nicht bereit für meine avantgardistische Kunst. Also gehe ich dahin, wo mich jeder sehen kann: ganz nach oben.

**Projekt: Schwein im Weltall.**

Der erste Schweinonaut der Geschichte. Beim Training musste ich in eine Tiefkühltruhe, unter Wasser ein Goldfischglas tragen und in einer Zentrifuge kreisen. Hinterher sah ich aus wie eine Briefmarke.

Vor dem Parabel-Flug habe ich zur Stärkung eine ganze Sahnetorte gegessen. Großer Fehler. Sahne und Schwerelosigkeit vertragen sich nicht. Sagen wir so: Es gab einen kleinen technischen Störfall.

Ins echte Weltall darf ich nun nicht. Angeblich zu gefährlich und zu teuer in der Reinigung. Vielleicht ist das besser — dort kann man schließlich kein Fenster öffnen.

Over and out, Major Schweini 🐷🚀🤢`,
  },
  {
    id: "6ebf365f-b24c-4a33-be49-6feee4664dbf",
    title: "Tag 2 der Operation „Weltruhm“",
    mood: "📸 Jetzt geht es los 📸",
    date_label: "16.02.2026 · 18:25",
    author: "Schweini",
    created_at: "2026-02-16T17:25:06.327977+00:00",
    images: Array.from({ length: 10 }, (_, index) => `public/images/6_${index + 1}.png`),
    body: `Heute habe ich beschlossen, dass die Welt endlich professionelle Fotos von mir braucht. Keine gewöhnlichen Bilder — Kunst.

Ich habe für jedes Motiv eine andere Pose erfunden: den nachdenklichen Rüssel, den lässigen Star und natürlich „Schweini blickt geheimnisvoll in die Ferne“. Es war körperlich sehr anstrengend, so unfassbar gut auszusehen.

Jetzt warte ich darauf, dass die Modelagenturen anrufen. Das Telefon ist auffällig still. Wahrscheinlich streiten sie noch darum, wer mich zuerst verpflichten darf.`,
  },
  {
    id: "d5dc6612-165b-4af1-8df4-3aac65a0d878",
    title: "Schon wieder alleine!",
    mood: "🏋️ Sport-Schweini 🏋️",
    date_label: "15.02.2026 · 14:15",
    author: "Schweini",
    created_at: "2026-02-15T13:15:46.64997+00:00",
    images: Array.from({ length: 11 }, (_, index) => `public/images/4_${index + 1}.png`),
    body: `Kaum dreht man sich einmal um, ist die Familie unterwegs. Schon wieder alleine! Andere würden Trübsal blasen. Ich starte selbstverständlich ein gigantisches Fitnessprogramm.

Nach ungefähr drei sehr sportlichen Bewegungen brauchte ich eine Pause. Und Pommes. Regeneration ist schließlich genauso wichtig wie Training.

Am Ende habe ich mich im Spiegel betrachtet und beschlossen: Man sieht die Muskeln nur deshalb nicht, weil mein Fell so luxuriös flauschig ist.`,
  },
  {
    id: "f3b5130c-47c6-4eca-96ed-4de71fa79abf",
    title: "Schweinis Wellness-Oase",
    mood: "🛀 Chillfaktor 1000 🛀",
    date_label: "05.01.2026",
    author: "Schweini",
    created_at: "2026-01-05T19:59:47.785929+00:00",
    images: Array.from({ length: 9 }, (_, index) => `public/images/3_${index + 1}.png`),
    body: `Nach all dem Sport hatte ich mir Wellness verdient. Ich verwandelte das Badezimmer in eine exklusive Schweini-Oase: Blubberblasen, Gurkenscheiben und absolute Ruhe.

Die Gurken waren überraschend langweilig. Deshalb habe ich sie gegen Pommes getauscht. Wellness muss schließlich auch schmecken.

Mein abschließendes Urteil: Fünf Sterne für den Service. Einen Stern Abzug, weil ich alles selbst machen musste.`,
  },
  {
    id: "0a571399-d0b7-44d8-9d13-90aa770cae36",
    title: "Schweinis Stadt-Abenteuer",
    mood: "🏙 Die Quadrate 🏙",
    date_label: "04.01.2026 · 20:18",
    author: "Schweini",
    created_at: "2026-01-04T21:16:43.462326+00:00",
    images: Array.from({ length: 10 }, (_, index) => `public/images/2_${index + 1}.png`),
    body: `Heute war ich in Mannheim. Eine Stadt aus Quadraten — endlich eine Stadtplanung, die auch ein Schwein versteht.

Ich habe Kultur gesehen, wichtige Gebäude geprüft und anschließend Nudel-Eis entdeckt. Ja, Nudeln. Als Eis. Ich war skeptisch, aber als internationaler Kritiker muss man offen bleiben.

Mein Urteil: Mannheim darf bleiben. Vor allem wegen des Nachtischs.`,
  },
  {
    id: "0224caac-ce6c-451f-aac4-16527d974309",
    title: "Tag 1 ohne Aufsicht (Sturmfrei!)",
    mood: "❄️ Supercool ❄️",
    date_label: "03.01.2026 · 22:13",
    author: "Schweini",
    created_at: "2026-01-04T07:33:59.139252+00:00",
    images: Array.from({ length: 6 }, (_, index) => `public/images/1_${index + 1}.png`),
    body: `Sturmfrei! Ein Wort wie Musik. Niemand sagt mir, wann Schlafenszeit ist oder wie viele Kekse ein vernünftiges Abendessen ergeben.

Ich habe einen sehr genauen Plan erstellt. Schritt eins: alle Regeln ignorieren. Schritt zwei: Kuchen. Schritt drei: spontan bleiben.

Irgendwann war das Wohnzimmer ein Abenteuerpark und ich sehr müde. Verantwortung ist anstrengend. Morgen räume ich auf. Vielleicht.`,
  },
];

const fallbackComments = [
  {
    id: "local-1",
    entry_id: fallbackEntries[0].id,
    author: "Elisa",
    body: "Wo ist eigentlich dein Workshop-Pokal, Schweini?",
    created_at: "2026-02-24T18:10:00+00:00",
  },
  {
    id: "local-2",
    entry_id: fallbackEntries[0].id,
    author: "Schweini",
    body: "In meiner geheimen Schatzkammer. Neben den Keksen. Zutritt streng verboten.",
    created_at: "2026-02-24T18:15:00+00:00",
  },
  {
    id: "local-3",
    entry_id: fallbackEntries[1].id,
    author: "Opa",
    body: "Welche Bürste hast du für das Waschbecken genommen?!",
    created_at: "2026-02-20T09:31:00+00:00",
  },
  {
    id: "local-4",
    entry_id: fallbackEntries[2].id,
    author: "Mama",
    body: "Der Schnurrbart steht dir verdächtig gut.",
    created_at: "2026-02-18T19:30:00+00:00",
  },
  {
    id: "local-5",
    entry_id: fallbackEntries[3].id,
    author: "Wonkel",
    body: "Wer bezahlt eigentlich die Reinigung der Rakete?",
    created_at: "2026-02-17T19:12:00+00:00",
  },
  {
    id: "local-6",
    entry_id: fallbackEntries[4].id,
    author: "Schweini",
    body: "Autogramme gibt es nach dem Kuchen.",
    created_at: "2026-02-16T19:00:00+00:00",
  },
];

const fallbackReactionCounts = {
  [fallbackEntries[0].id]: { "🐷": 8, "🤣": 12, "🤦": 6, "💩": 2 },
  [fallbackEntries[1].id]: { "🐷": 13, "🤣": 9, "🤦": 18, "💩": 7 },
  [fallbackEntries[2].id]: { "🐷": 5, "🤣": 11, "🤦": 9, "💩": 8 },
  [fallbackEntries[3].id]: { "🐷": 7, "🤣": 13, "🤦": 6, "💩": 10 },
};

const heroSlides = [
  {
    entryId: fallbackEntries[0].id,
    lines: ["Chef", "im Dienst.", "Das war echte", "Kuchenarbeit."],
    image: "public/images/10_1.webp",
    label: "Das VIP-Schwein",
    caption: "Wichtige Konferenz, angeblich",
    deck: "Schweini auf wichtiger Dienstreise. Mit großem Hunger, noch größerem Auftritt und exakt null Zurückhaltung.",
  },
  {
    entryId: fallbackEntries[2].id,
    lines: ["Natürlich", "berühmt.", "Mein Talent ist", "unfassbar."],
    image: "public/images/8_4.webp",
    label: "Direkt aus Hollywood",
    caption: "Weltruhm, völlig logisch",
    deck: "Actionheld, Filmstar und Superschurke mit weißer Katze. Schweini liefert alles — vor allem Rüssel-Charisma.",
  },
  {
    entryId: fallbackEntries[1].id,
    lines: ["Danke.", "An mich.", "Für mein schieres", "Können."],
    image: "public/images/9_2.webp",
    label: "Haushaltsexperte",
    caption: "Triumph, absolut verdient",
    deck: "Elisa kommt nach Hause. Schweini putzt, kocht und backt. Was könnte da schon schiefgehen?",
  },
];

const products = [
  {
    color: "red",
    edition: "Limitierte Nichts-Auflage",
    icon: "💨",
    title: "Original Schweini-Luft",
    text: "Direkt neben Schweini abgefüllt. Wahrscheinlich wertvoll. Mit unsichtbarem Echtheitszertifikat.",
    price: "3 Kuchenkrümel",
  },
  {
    color: "blue",
    edition: "Von Experten überschätzt",
    icon: "🏆",
    title: "Pokal für fast alles",
    text: "Für besondere Leistungen wie Aufstehen, Herumsitzen oder sehr überzeugendes Nichtstun.",
    price: "1 Kompliment",
  },
  {
    color: "pink",
    edition: "Kulinarische Kollektion",
    icon: "🍰",
    title: "Notfall-Sahnetorte",
    text: "Nur für echte Notfälle. Ein echter Notfall liegt vor, sobald Schweini Kuchen möchte.",
    price: "Unbezahlbar",
  },
  {
    color: "yellow",
    edition: "Offizielles Amtszubehör",
    icon: "👑",
    title: "Chef-vom-Dienst-Krone",
    text: "Verleiht sofortige Autorität. Verantwortung und Aufräumen sind ausdrücklich nicht enthalten.",
    price: "2× Applaus",
  },
];

const state = {
  entries: structuredClone(fallbackEntries),
  comments: structuredClone(fallbackComments),
  reactionCounts: structuredClone(fallbackReactionCounts),
  connected: false,
  heroIndex: 0,
  heroTimer: null,
  diaryFilter: "alle",
  lightboxImages: [],
  lightboxIndex: 0,
  memory: null,
  toastTimer: null,
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value = "") {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown = "") {
  const normalized = String(markdown).replace(/\r\n/g, "\n").trim();
  if (!normalized) return "<p>Schweini schweigt geheimnisvoll.</p>";

  return normalized
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((line) => /^\s*[*-]\s+/.test(line))) {
        const items = lines
          .map((line) => line.replace(/^\s*[*-]\s+/, ""))
          .map((line) => `<li>${inlineMarkdown(line)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (/^###\s+/.test(block)) return `<h3>${inlineMarkdown(block.replace(/^###\s+/, ""))}</h3>`;
      if (/^##\s+/.test(block)) return `<h2>${inlineMarkdown(block.replace(/^##\s+/, ""))}</h2>`;
      return `<p>${lines.map(inlineMarkdown).join("<br>")}</p>`;
    })
    .join("");
}

function plainExcerpt(markdown = "", length = 180) {
  const text = String(markdown)
    .replace(/\*\*/g, "")
    .replace(/[*#_>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= length) return text;
  return `${text.slice(0, length).replace(/\s+\S*$/, "")} …`;
}

function imagePath(source) {
  if (!source) return "public/images/profile.webp";
  try {
    const url = new URL(source, window.location.href);
    if (url.hostname === "schweini-diary.vercel.app" && url.pathname.startsWith("/public/images/")) {
      return url.pathname.slice(1).replace(/\.png$/i, ".webp");
    }
  } catch {
    return source.replace(/\.png$/i, ".webp");
  }
  return source.replace(/\.png$/i, ".webp");
}

function entryDate(entry) {
  try {
    const parts = new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Berlin",
    }).formatToParts(new Date(entry.created_at));
    const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${value.day}.${value.month}.${value.year} · ${value.hour}:${value.minute}`;
  } catch {
    return "Neulich";
  }
}

function commentsFor(entryId) {
  return state.comments.filter((comment) => String(comment.entry_id) === String(entryId));
}

function countsFor(entryId) {
  return state.reactionCounts[entryId] || {};
}

function renderReactions(entryId) {
  const counts = countsFor(entryId);
  return ["🐷", "🤣", "🤦", "💩"]
    .map(
      (emoji) => `
        <button class="reaction" type="button" data-reaction="${emoji}" data-entry-id="${escapeHtml(entryId)}"
          aria-label="Mit ${emoji} reagieren">
          <span>${emoji}</span> <small>${counts[emoji] || ""}</small>
        </button>`,
    )
    .join("");
}

function routeFromHash() {
  const raw = window.location.hash.slice(1);
  if (!raw || raw === "start") return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function entryLink(entry) {
  return `#/geschichte/${encodeURIComponent(entry.id)}`;
}

function getEntry(entryId) {
  return state.entries.find((entry) => String(entry.id) === String(entryId));
}

function renderProducts(limit = products.length, rail = false) {
  return `
    <div class="${rail ? "product-rail" : "product-grid"}">
      ${products
        .slice(0, limit)
        .map(
          (product) => `
          <article class="product-card product-card--${product.color}">
            <span class="product-card__edition">${escapeHtml(product.edition)}</span>
            <div class="product-card__art" aria-hidden="true">${product.icon}</div>
            <h3>${escapeHtml(product.title)}</h3>
            <p>${escapeHtml(product.text)}</p>
            <footer>
              <strong>${escapeHtml(product.price)}</strong>
              <button class="buy-button" type="button" data-buy="${escapeHtml(product.title)}">Haben wollen!</button>
            </footer>
          </article>`,
        )
        .join("")}
    </div>`;
}

function renderFooter() {
  return `
    <section class="final-cta">
      <div class="section-shell final-cta__grid">
        <img src="public/images/1_4.webp" alt="Schweini wartet auf das nächste Abenteuer" loading="lazy">
        <div>
          <span>Bis zum nächsten Meisterwerk</span>
          <h2>Schweini hat noch sehr viel vor.</h2>
          <button class="button button--yellow open-post-dialog" type="button">Etwas beitragen →</button>
        </div>
      </div>
    </section>
    <footer class="site-footer">
      <strong>Schweinis Welt</strong>
      <p>Von Schweini. Über Schweini. Zu Ehren von Schweini.</p>
      <button type="button" data-chaos>Upsi-Knopf</button>
    </footer>`;
}

function renderStoryFeature(entry) {
  if (!entry) return "";
  return `
    <article class="story-feature">
      <div class="story-feature__image">
        <img src="${escapeHtml(imagePath(entry.images?.[0]))}" alt="${escapeHtml(entry.title)}" loading="lazy">
        <span class="story-feature__badge">Chef-Sache</span>
      </div>
      <div class="story-feature__body">
        <div class="story-meta">
          <span>${escapeHtml(entryDate(entry))}</span>
          <span>${escapeHtml(entry.mood || "Großartig")}</span>
        </div>
        <h3>${escapeHtml(entry.title)}</h3>
        <p>${escapeHtml(plainExcerpt(entry.body, 290))}</p>
        <footer class="story-feature__footer">
          <a class="text-link" href="${entryLink(entry)}">Ganze Geschichte lesen →</a>
          <div class="reaction-row">${renderReactions(entry.id)}</div>
        </footer>
      </div>
    </article>`;
}

function renderStoryCards(entries, limit = entries.length) {
  return `
    <div class="story-grid">
      ${entries
        .slice(0, limit)
        .map(
          (entry, index) => `
            <article class="story-card">
              <img src="${escapeHtml(imagePath(entry.images?.[0]))}" alt="${escapeHtml(entry.title)}" loading="lazy">
              <div class="story-card__body">
                <span class="story-card__index">Akte ${String(index + 2).padStart(2, "0")} · ${escapeHtml(entryDate(entry))}</span>
                <h3>${escapeHtml(entry.title)}</h3>
                <p>${escapeHtml(plainExcerpt(entry.body, 125))}</p>
                <a href="${entryLink(entry)}">Weiterlesen →</a>
              </div>
            </article>`,
        )
        .join("")}
    </div>`;
}

function renderCommentsRail() {
  const comments = state.comments.slice(-6).reverse();
  if (!comments.length) return `<div class="empty-state">Noch verdächtig still hier.</div>`;
  return `
    <div class="comment-rail">
      ${comments
        .map((comment) => {
          const entry = getEntry(comment.entry_id);
          return `
            <article class="comment-card">
              <header>
                <span class="avatar">${identities[comment.author] || escapeHtml(String(comment.author || "?").slice(0, 1))}</span>
                <div>
                  <strong>${escapeHtml(comment.author || "Familie")}</strong>
                  <small>zu ${escapeHtml(entry?.title || "Schweini")}</small>
                </div>
              </header>
              <p>„${escapeHtml(comment.body)}“</p>
              <time>${escapeHtml(formatRelativeDate(comment.created_at))}</time>
            </article>`;
        })
        .join("")}
    </div>`;
}

function formatRelativeDate(date) {
  if (!date) return "Gerade eben";
  const difference = Date.now() - new Date(date).getTime();
  const days = Math.floor(difference / 86400000);
  if (days <= 0) return "Heute";
  if (days === 1) return "Gestern";
  if (days < 7) return `vor ${days} Tagen`;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(date));
}

function renderHome() {
  const featured = state.entries[0];
  const secondary = state.entries.slice(1, 5);
  const slide = heroSlides[state.heroIndex];

  return `
    <div class="route route--home">
      <section class="home-hero">
        <div class="section-shell home-hero__grid">
          <div class="hero-copy">
            <div class="hero-copy__meta">
              <span class="eyebrow eyebrow--boxed">Direkt vom Genie · Neu</span>
              <span class="issue-number">Ausgabe 09</span>
            </div>
            <h1 class="hero-title">
              <span class="hero-title__top" id="hero-line-1">${escapeHtml(slide.lines[0])}</span>
              <span class="hero-title__red hero-title__fit" id="hero-line-2">${escapeHtml(slide.lines[1])}</span>
              <span class="hero-title__script" id="hero-line-3">${escapeHtml(slide.lines[2])}</span>
              <span class="hero-title__fit" id="hero-line-4">${escapeHtml(slide.lines[3])}</span>
            </h1>
            <p class="hero-deck" id="hero-deck">${escapeHtml(slide.deck)}</p>
            <div class="hero-actions">
              <a class="button button--red" id="hero-link" href="#/geschichte/${encodeURIComponent(slide.entryId)}">Abenteuer lesen →</a>
              <button class="button button--paper open-post-dialog" type="button">Senf dazugeben</button>
            </div>
          </div>

          <div class="hero-stage">
            <div class="hero-stage__photo">
              <img id="hero-image" src="${escapeHtml(slide.image)}" alt="Schweini in seinem neuesten Abenteuer">
              <span class="hero-stage__label" id="hero-label">${escapeHtml(slide.label)}</span>
              <div class="hero-stage__caption">
                <span id="hero-caption">${escapeHtml(slide.caption)}</span>
                <span>Foto ${String(state.heroIndex + 1).padStart(2, "0")} / 03</span>
              </div>
            </div>
            <div class="hero-switcher" aria-label="Titelgeschichten">
              ${heroSlides
                .map(
                  (item, index) => `
                    <button class="hero-switch ${index === state.heroIndex ? "is-active" : ""}" type="button" data-hero-index="${index}">
                      <img src="${escapeHtml(item.image)}" alt="" aria-hidden="true">
                      <span>${escapeHtml(item.caption)}</span>
                    </button>`,
                )
                .join("")}
            </div>
          </div>

          <div class="hero-stats">
            <div class="hero-stat"><strong>${state.entries.length}</strong><span>Heldentaten</span></div>
            <div class="hero-stat"><strong>${state.entries.reduce((sum, entry) => sum + (entry.images?.length || 0), 0)}</strong><span>Beweisfotos</span></div>
            <div class="hero-stat"><strong>1</strong><span>Genie</span></div>
          </div>
        </div>
      </section>

      <section class="stories-section">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-heading__number">01</span>
            <div><small>Aus dem Tagebuch des Genies</small><h2>Neueste Heldentaten</h2></div>
            <p>Echt wahr!* <small>*Nach Schweinis eigener, sehr zuverlässiger Erinnerung.</small></p>
          </div>
          ${renderStoryFeature(featured)}
          ${renderStoryCards(secondary, 4)}
          <div class="section-actions">
            <a class="button button--paper" href="#/tagebuch">Alle Heldentaten laden →</a>
          </div>
        </div>
      </section>

      <section class="personality-band">
        <div class="section-shell personality-band__inner">
          <div class="personality-portrait">
            <img src="public/images/profile.webp" alt="Offizielles Schweini-Porträt" loading="lazy">
          </div>
          <div class="personality-copy">
            <span class="eyebrow">Persönlichkeit des Monats · Jeden Monat</span>
            <h2>Ein Schwein. Sehr viele Talente.</h2>
            <p>Schweini ist Kuscheltier, Weltstar, Kuchenexperte und selbst ernannter Chef vom Dienst. Bescheidenheit hält er für ein Gerücht.</p>
            <div class="personality-tags">
              <span>Rüssel-Charisma</span><span>Chaos 9000</span><span>Kuchenkompetenz</span><span>Elisa-Fan</span>
            </div>
            <a class="button button--yellow" href="#/schweini">Das Schwein kennenlernen →</a>
          </div>
        </div>
      </section>

      <section class="community-section">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-heading__number">02</span>
            <div><small>Familien-Funk</small><h2>Die Familie hat Meinungen</h2></div>
            <p>Kein Login, keine Fremden, nur wohlmeinende Zwischenrufe und gelegentliche Nachfragen zu verschwundenem Kuchen.</p>
          </div>
          ${renderCommentsRail()}
          <button class="compose-card open-post-dialog" type="button">
            <span class="compose-card__plus">+</span>
            <span><strong>Direkter Draht zum Schwein</strong><small>Geschichte, Foto oder Senf beisteuern</small></span>
            <span>→</span>
          </button>
        </div>
      </section>

      <section class="shop-preview">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-heading__number">03</span>
            <div><small>Ausverkauft wegen Genialität</small><h2>Der Quatschladen</h2></div>
            <p>Exklusive Dinge, die niemand braucht und trotzdem alle haben wollen. Bezahlt wird selbstverständlich nicht mit echtem Geld.</p>
          </div>
          ${renderProducts(3, true)}
          <div class="section-actions"><a class="button button--paper" href="#/laden">Alles ansehen →</a></div>
        </div>
      </section>

      <section class="play-preview">
        <div class="section-shell play-preview__grid">
          <div>
            <span class="eyebrow">04 · Training für Profis</span>
            <h2>Schweini-Memory</h2>
            <p>Finde die Paare, trainiere dein Gehirn und beweise, dass du mindestens so schlau bist wie ein sehr ehrgeiziges Plüschschwein.</p>
            <a class="button button--yellow" href="#/spielplatz">Spiel starten →</a>
          </div>
          <div class="play-preview__art" aria-hidden="true">
            <div class="play-card play-card--one">?</div>
            <div class="play-card play-card--two">🍰</div>
            <div class="play-pig">🐷</div>
          </div>
        </div>
      </section>
      ${renderFooter()}
    </div>`;
}

function categoryFor(entry) {
  const value = `${entry.title} ${entry.body}`.toLowerCase();
  if (/star|ruhm|model|weltall/.test(value)) return "weltruhm";
  if (/reise|stadt|mannheim|workshop/.test(value)) return "unterwegs";
  return "zuhause";
}

function renderDiary() {
  const categories = [
    ["alle", "Alle"],
    ["weltruhm", "Weltruhm"],
    ["unterwegs", "Unterwegs"],
    ["zuhause", "Zu Hause"],
  ];
  const entries =
    state.diaryFilter === "alle"
      ? state.entries
      : state.entries.filter((entry) => categoryFor(entry) === state.diaryFilter);

  return `
    <div class="route">
      <header class="page-hero page-shell" data-watermark="09">
        <span class="eyebrow eyebrow--boxed">Schweinis Privatarchiv</span>
        <h1>Tagebuch <em>eines Genies</em></h1>
        <p>Alle echten Heldentaten, kleineren Missverständnisse und sehr vernünftigen Kuchenentscheidungen an einem Ort.</p>
      </header>
      <section class="page-shell">
        <div class="filter-row" aria-label="Geschichten filtern">
          ${categories
            .map(
              ([value, label]) =>
                `<button class="filter-chip ${state.diaryFilter === value ? "is-active" : ""}" type="button" data-diary-filter="${value}">${label}</button>`,
            )
            .join("")}
        </div>
        <div class="diary-grid">
          ${entries
            .map(
              (entry, index) => `
                <article class="diary-card">
                  <div class="diary-card__image">
                    <img src="${escapeHtml(imagePath(entry.images?.[0]))}" alt="${escapeHtml(entry.title)}" loading="lazy">
                    <span class="diary-card__number">${String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div class="diary-card__body">
                    <div class="story-meta"><span>${escapeHtml(entryDate(entry))}</span><span>${escapeHtml(entry.mood || "Schweinisch gut")}</span></div>
                    <h2>${escapeHtml(entry.title)}</h2>
                    <p>${escapeHtml(plainExcerpt(entry.body, 190))}</p>
                    <a class="button button--paper button--wide" href="${entryLink(entry)}">Ganze Geschichte →</a>
                  </div>
                </article>`,
            )
            .join("")}
        </div>
      </section>
      ${renderFooter()}
    </div>`;
}

function renderStory(entryId) {
  const entry = getEntry(entryId);
  if (!entry) {
    return `
      <div class="route">
        <section class="page-hero page-shell" data-watermark="?">
          <span class="eyebrow eyebrow--boxed">Upsi</span>
          <h1>Geschichte verschwunden</h1>
          <p>Schweini hat sie vermutlich in seiner geheimen Schatzkammer versteckt.</p>
          <p><a class="button button--red" href="#/tagebuch">Zurück zum Tagebuch</a></p>
        </section>
        ${renderFooter()}
      </div>`;
  }

  const comments = commentsFor(entry.id);
  const images = entry.images?.length ? entry.images.map(imagePath) : ["public/images/profile.webp"];
  const firstParagraph = plainExcerpt(entry.body, 230);

  return `
    <div class="route story-detail">
      <section class="page-shell story-detail__mast">
        <div class="story-detail__hero">
          <button class="gallery-button" type="button" data-lightbox-entry="${escapeHtml(entry.id)}" data-lightbox-index="0">
            <img src="${escapeHtml(images[0])}" alt="${escapeHtml(entry.title)}">
          </button>
        </div>
        <div class="story-detail__copy">
          <a class="back-link" href="#/tagebuch">← Zurück zum Tagebuch</a>
          <div class="story-meta"><span>${escapeHtml(entryDate(entry))}</span><span>${escapeHtml(entry.mood || "Großartig")}</span></div>
          <h1>${escapeHtml(entry.title)}</h1>
          <p class="story-detail__lead">${escapeHtml(firstParagraph)}</p>
        </div>
      </section>

      ${
        images.length > 1
          ? `<div class="page-shell story-gallery">
              ${images
                .map(
                  (source, index) => `
                    <button class="gallery-button" type="button" data-lightbox-entry="${escapeHtml(entry.id)}" data-lightbox-index="${index}">
                      <img src="${escapeHtml(source)}" alt="${escapeHtml(entry.title)}, Bild ${index + 1}" loading="${index < 3 ? "eager" : "lazy"}">
                      <span>${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}</span>
                    </button>`,
                )
                .join("")}
            </div>`
          : ""
      }

      <article class="story-article">${markdownToHtml(entry.body)}</article>

      <section class="page-shell story-social">
        <div class="story-social__reactions">
          <strong>Wie findest du das, ganz ehrlich?</strong>
          <div class="reaction-row">${renderReactions(entry.id)}</div>
        </div>
        <div class="comments-block">
          <h2>Familien-Senf <small>(${comments.length})</small></h2>
          <div class="comments-list">
            ${
              comments.length
                ? comments
                    .map(
                      (comment) => `
                        <article class="story-comment">
                          <strong>${escapeHtml(comment.author || "Familie")}</strong>
                          <p>${escapeHtml(comment.body)}</p>
                        </article>`,
                    )
                    .join("")
                : `<div class="story-comment"><p>Noch kein Senf. Das ist verdächtig.</p></div>`
            }
          </div>
          <form class="comment-form" data-comment-form="${escapeHtml(entry.id)}">
            <select name="author" aria-label="Dein Name" required>
              <option value="">Wer bist du?</option>
              ${Object.keys(identities)
                .filter((name) => name !== "Schweini")
                .map((name) => `<option>${name}</option>`)
                .join("")}
            </select>
            <input type="text" name="body" maxlength="500" placeholder="Dein Senf zu dieser Geschichte …" aria-label="Kommentar" required>
            <button class="button button--red" type="submit">Absenden →</button>
          </form>
        </div>
      </section>
      ${renderFooter()}
    </div>`;
}

function renderProfile() {
  const timelineEntries = state.entries.slice().reverse().slice(-6);
  return `
    <div class="route">
      <section class="profile-hero">
        <div class="page-shell profile-hero__grid">
          <div class="profile-image">
            <img src="public/images/profile.webp" alt="Schweini, offizielles Porträt">
          </div>
          <div class="profile-copy">
            <span class="eyebrow">Offiziell vom Schwein bestätigt</span>
            <h1>Schweini</h1>
            <p class="profile-copy__quote">„Bescheidenheit ist wichtig. Deshalb erzähle ich nur sehr selten, dass ich in allem der Beste bin.“</p>
            <div class="profile-facts">
              <div class="profile-fact"><span>Beruf</span><strong>Genie</strong></div>
              <div class="profile-fact"><span>Talent</span><strong>Alles</strong></div>
              <div class="profile-fact"><span>Lieblingsessen</span><strong>Kuchen</strong></div>
              <div class="profile-fact"><span>Lieblingsmensch</span><strong>Elisa</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-shell">
        <div class="section-heading">
          <span class="section-heading__number">01</span>
          <div><small>Die offizielle Schweini-Lehre</small><h2>Seine drei Grundsätze</h2></div>
        </div>
        <div class="manifesto-grid">
          <article class="manifesto-card"><span>01</span><h3>Erst Kuchen, dann Fragen</h3><p>Komplizierte Entscheidungen lassen sich mit Sahne wesentlich besser treffen.</p></article>
          <article class="manifesto-card"><span>02</span><h3>Selbstvertrauen spart Zeit</h3><p>Warum auf Applaus warten, wenn man sich sofort selbst eine Rede halten kann?</p></article>
          <article class="manifesto-card"><span>03</span><h3>Elisa ist wichtiger als Ruhm</h3><p>Weltruhm ist nett. Kuscheln mit Elisa ist allerdings ganz klar die bessere Karriere.</p></article>
        </div>
      </section>

      <section class="section-shell">
        <div class="section-heading">
          <span class="section-heading__number">02</span>
          <div><small>Karriere eines Ausnahmeschweins</small><h2>Die Chronik</h2></div>
          <p>Von Sturmfrei bis Weltruhm in nur wenigen, erstaunlich chaotischen Wochen.</p>
        </div>
        <div class="timeline">
          ${timelineEntries
            .map(
              (entry) => `
                <a class="timeline-item" href="${entryLink(entry)}">
                  <img src="${escapeHtml(imagePath(entry.images?.[0]))}" alt="" loading="lazy">
                  <div><time>${escapeHtml(entryDate(entry))}</time><h3>${escapeHtml(entry.title)}</h3></div>
                </a>`,
            )
            .join("")}
        </div>
      </section>
      ${renderFooter()}
    </div>`;
}

function renderShop() {
  return `
    <div class="route">
      <header class="page-hero page-shell" data-watermark="€0">
        <span class="eyebrow eyebrow--boxed">Ausverkauft wegen Genialität</span>
        <h1>Quatschladen <em>garantiert unnötig</em></h1>
        <p>Keine echten Produkte, kein echtes Geld, keinerlei vernünftiger Nutzen. Schweini hält das für ein ausgezeichnetes Geschäftsmodell.</p>
      </header>
      <section class="page-shell">
        ${renderProducts()}
        <p class="empty-state">Alle Produkte sind gleichzeitig limitiert, ausverkauft und jederzeit verfügbar. Fragen dazu beantwortet Schweinis Rechtsabteilung — also niemand.</p>
      </section>
      ${renderFooter()}
    </div>`;
}

function shuffledCards() {
  const symbols = ["🐷", "🍰", "👑", "🚀", "🎬", "💩"];
  return [...symbols, ...symbols]
    .map((symbol) => ({ symbol, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ symbol }, index) => ({ symbol, id: index, matched: false, visible: false }));
}

function resetMemoryState() {
  state.memory = {
    cards: shuffledCards(),
    first: null,
    second: null,
    moves: 0,
    pairs: 0,
    locked: false,
  };
}

function renderGames() {
  if (!state.memory) resetMemoryState();
  return `
    <div class="route">
      <header class="page-hero page-shell" data-watermark="?">
        <span class="eyebrow eyebrow--boxed">Training für Profis</span>
        <h1>Spielplatz <em>für schlaue Schweine</em></h1>
        <p>Hier wird das Gehirn trainiert. Oder zumindest beschäftigt, bis jemand Kuchen bringt.</p>
      </header>
      <section class="page-shell games-grid">
        <article class="game-panel game-panel--memory">
          <header class="game-panel__header">
            <div><span>Spiel 01</span><h2>Schweini-Memory</h2></div>
            <div class="game-status" id="memory-status">${state.memory.moves} Züge · ${state.memory.pairs}/6 Paare</div>
          </header>
          <div class="memory-grid" id="memory-grid">
            ${state.memory.cards
              .map(
                (card, index) => `
                  <button class="memory-card ${card.visible ? "is-visible" : ""} ${card.matched ? "is-matched" : ""}"
                    type="button" data-memory-index="${index}" aria-label="Memory-Karte ${index + 1}">
                    <span aria-hidden="true">${card.symbol}</span>
                  </button>`,
              )
              .join("")}
          </div>
          <button class="game-restart" type="button" data-memory-restart>Neu mischen</button>
        </article>

        <article class="game-panel game-panel--oracle">
          <header class="game-panel__header">
            <div><span>Spiel 02</span><h2>Rüssel-Orakel</h2></div>
          </header>
          <div class="oracle-stage">
            <div class="oracle-pig" aria-hidden="true">🐽</div>
            <p class="oracle-answer" id="oracle-answer">Stelle dir eine wichtige Frage. Schweinis Rüssel kennt vermutlich die Antwort.</p>
            <button class="button button--red" type="button" data-oracle>Rüssel befragen →</button>
          </div>
        </article>
      </section>
      ${renderFooter()}
    </div>`;
}

function renderRoute(options = {}) {
  const route = routeFromHash();
  clearInterval(state.heroTimer);
  state.heroTimer = null;

  let html;
  let title = "Schweinis Welt — Genie. Chaos. Sahnetorte.";
  if (route === "/") {
    html = renderHome();
  } else if (route === "/tagebuch") {
    html = renderDiary();
    title = "Tagebuch — Schweinis Welt";
  } else if (route.startsWith("/geschichte/")) {
    const entryId = decodeURIComponent(route.replace("/geschichte/", ""));
    const entry = getEntry(entryId);
    html = renderStory(entryId);
    title = `${entry?.title || "Geschichte"} — Schweinis Welt`;
  } else if (route === "/schweini") {
    html = renderProfile();
    title = "Das Schwein — Schweinis Welt";
  } else if (route === "/laden") {
    html = renderShop();
    title = "Quatschladen — Schweinis Welt";
  } else if (route === "/spielplatz") {
    html = renderGames();
    title = "Spielplatz — Schweinis Welt";
  } else {
    window.location.hash = "#/";
    return;
  }

  app.innerHTML = html;
  document.title = title;
  updateNavigation(route);

  if (!options.preserveScroll) window.scrollTo({ top: 0, behavior: "instant" });
  if (route === "/") {
    fitHeroLines();
    startHeroRotation();
  }
}

function updateNavigation(route) {
  document.querySelectorAll("[data-nav-route]").forEach((link) => {
    const target = link.dataset.navRoute;
    const active = target === "/" ? route === "/" : route.startsWith(target);
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function setHeroSlide(index, userInitiated = false) {
  state.heroIndex = Number(index) % heroSlides.length;
  const slide = heroSlides[state.heroIndex];
  const image = document.querySelector("#hero-image");
  if (!image) return;

  image.classList.add("is-changing");
  window.setTimeout(() => {
    image.src = slide.image;
    document.querySelector("#hero-line-1").textContent = slide.lines[0];
    document.querySelector("#hero-line-2").textContent = slide.lines[1];
    document.querySelector("#hero-line-3").textContent = slide.lines[2];
    document.querySelector("#hero-line-4").textContent = slide.lines[3];
    document.querySelector("#hero-deck").textContent = slide.deck;
    document.querySelector("#hero-label").textContent = slide.label;
    document.querySelector("#hero-caption").textContent = slide.caption;
    document.querySelector("#hero-link").href = `#/geschichte/${encodeURIComponent(slide.entryId)}`;
    image.nextElementSibling?.nextElementSibling?.querySelector("span:last-child");
    document.querySelectorAll("[data-hero-index]").forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === state.heroIndex);
    });
    fitHeroLines();
    image.classList.remove("is-changing");
  }, 170);

  if (userInitiated) startHeroRotation();
}

function fitHeroLines() {
  const title = document.querySelector(".hero-title");
  const lines = title?.querySelectorAll(".hero-title__fit");
  if (!title || !lines?.length) return;

  lines.forEach((line) => {
    line.style.fontSize = "";
  });

  window.requestAnimationFrame(() => {
    const availableWidth = title.clientWidth - 8;
    lines.forEach((line) => {
      const range = document.createRange();
      range.selectNodeContents(line);
      const textWidth = range.getBoundingClientRect().width;
      if (textWidth <= availableWidth) return;

      const naturalSize = Number.parseFloat(window.getComputedStyle(line).fontSize);
      const fittedSize = naturalSize * (availableWidth / textWidth) * .98;
      line.style.fontSize = `${fittedSize}px`;
    });
  });
}

function startHeroRotation() {
  clearInterval(state.heroTimer);
  state.heroTimer = window.setInterval(() => setHeroSlide(state.heroIndex + 1), 6500);
}

function showToast(message) {
  clearTimeout(state.toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function openMenu() {
  menuSheet.classList.add("is-open");
  menuSheet.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menuSheet.classList.remove("is-open");
  menuSheet.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function openPostDialog() {
  closeMenu();
  if (typeof postDialog.showModal === "function") postDialog.showModal();
  else postDialog.setAttribute("open", "");
}

function closePostDialog() {
  if (postDialog.open) postDialog.close();
}

function openLightbox(entryId, index) {
  const entry = getEntry(entryId);
  if (!entry?.images?.length) return;
  state.lightboxImages = entry.images.map(imagePath);
  state.lightboxIndex = Number(index);
  updateLightbox(entry.title);
  lightbox.showModal();
}

function updateLightbox(title = "") {
  const source = state.lightboxImages[state.lightboxIndex];
  if (!source) return;
  lightboxImage.src = source;
  lightboxCaption.textContent = `${title || "Schweini in Aktion"} · ${state.lightboxIndex + 1} / ${state.lightboxImages.length}`;
}

function moveLightbox(direction) {
  const length = state.lightboxImages.length;
  if (!length) return;
  state.lightboxIndex = (state.lightboxIndex + direction + length) % length;
  updateLightbox(getEntryFromLightbox()?.title);
}

function getEntryFromLightbox() {
  const current = state.lightboxImages[0];
  return state.entries.find((entry) => entry.images?.map(imagePath).includes(current));
}

async function handleReaction(button) {
  const entryId = button.dataset.entryId;
  const emoji = button.dataset.reaction;
  if (!entryId || !emoji) return;

  state.reactionCounts[entryId] ||= {};
  state.reactionCounts[entryId][emoji] = (state.reactionCounts[entryId][emoji] || 0) + 1;
  button.querySelector("small").textContent = state.reactionCounts[entryId][emoji];
  button.classList.add("is-reacted");

  if (state.connected) {
    try {
      await supabaseInsert("reactions", { entry_id: entryId, emoji });
    } catch {
      showToast("Schweinis Funkgerät hat die Reaktion nicht gehört.");
      return;
    }
  }
  showToast(`${emoji} wurde offiziell zur Kenntnis genommen.`);
}

async function handleCommentSubmit(form) {
  const entryId = form.dataset.commentForm;
  const data = new FormData(form);
  const payload = {
    entry_id: entryId,
    author: String(data.get("author") || "").trim(),
    body: String(data.get("body") || "").trim(),
    created_at: new Date().toISOString(),
  };
  if (!payload.author || !payload.body) return;

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    if (state.connected) await supabaseInsert("comments", { entry_id: entryId, author: payload.author, body: payload.body });
    state.comments.push({ id: `local-${Date.now()}`, ...payload });
    renderRoute({ preserveScroll: true });
    showToast("Der Familien-Senf ist angekommen.");
  } catch {
    showToast("Schweinis Funkgerät schnarcht. Versuch es gleich noch einmal.");
    submitButton.disabled = false;
  }
}

function handleFamilyPostSubmit(event) {
  event.preventDefault();
  const data = new FormData(postForm);
  const draft = {
    author: String(data.get("author") || ""),
    title: String(data.get("title") || ""),
    body: String(data.get("body") || ""),
    imageNames: Array.from(postForm.elements.images.files || []).slice(0, 6).map((file) => file.name),
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem("schweini-family-draft", JSON.stringify(draft));
  postForm.reset();
  uploadPreview.innerHTML = "";
  closePostDialog();
  showToast("Vorgemerkt! Schweini prüft nun, ob er darin heldenhaft genug vorkommt.");
}

function handleUploads(input) {
  const files = Array.from(input.files || []).slice(0, 6);
  uploadPreview.innerHTML = "";
  files.forEach((file) => {
    const image = new Image();
    image.alt = file.name;
    image.src = URL.createObjectURL(file);
    image.addEventListener("load", () => URL.revokeObjectURL(image.src), { once: true });
    uploadPreview.append(image);
  });
}

function handleDiaryFilter(value) {
  state.diaryFilter = value;
  renderRoute({ preserveScroll: true });
}

function handleMemoryCard(index) {
  const game = state.memory;
  const card = game?.cards[index];
  if (!game || !card || game.locked || card.visible || card.matched) return;

  card.visible = true;
  const element = document.querySelector(`[data-memory-index="${index}"]`);
  element?.classList.add("is-visible");

  if (game.first === null) {
    game.first = index;
    return;
  }

  game.second = index;
  game.moves += 1;
  game.locked = true;
  updateMemoryStatus();

  const firstCard = game.cards[game.first];
  if (firstCard.symbol === card.symbol) {
    firstCard.matched = true;
    card.matched = true;
    game.pairs += 1;
    game.locked = false;
    document.querySelector(`[data-memory-index="${game.first}"]`)?.classList.add("is-matched");
    element?.classList.add("is-matched");
    game.first = null;
    game.second = null;
    updateMemoryStatus();
    if (game.pairs === 6) showToast(`Gewonnen in ${game.moves} Zügen. Schweini ist angemessen beeindruckt.`);
    return;
  }

  const firstIndex = game.first;
  const secondIndex = game.second;
  window.setTimeout(() => {
    game.cards[firstIndex].visible = false;
    game.cards[secondIndex].visible = false;
    document.querySelector(`[data-memory-index="${firstIndex}"]`)?.classList.remove("is-visible");
    document.querySelector(`[data-memory-index="${secondIndex}"]`)?.classList.remove("is-visible");
    game.first = null;
    game.second = null;
    game.locked = false;
  }, 720);
}

function updateMemoryStatus() {
  const status = document.querySelector("#memory-status");
  if (status && state.memory) status.textContent = `${state.memory.moves} Züge · ${state.memory.pairs}/6 Paare`;
}

function restartMemory() {
  resetMemoryState();
  renderRoute({ preserveScroll: true });
}

function askOracle() {
  const answers = [
    "Ja. Aber iss vorher ein Stück Kuchen.",
    "Nein. Das klingt nach Aufräumen.",
    "Schweinis Quellen sagen: sehr wahrscheinlich.",
    "Frage Elisa. Sie ist in solchen Dingen erstaunlich klug.",
    "Rüssel sagt ja. Bauch sagt Sahnetorte.",
    "Unklar. Dramatisch seufzen und später noch einmal fragen.",
    "Nur wenn Schweini dabei die Hauptrolle bekommt.",
  ];
  const answer = answers[Math.floor(Math.random() * answers.length)];
  const element = document.querySelector("#oracle-answer");
  if (element) element.textContent = answer;
}

function triggerChaos() {
  document.body.animate(
    [
      { transform: "translateX(0) rotate(0)" },
      { transform: "translateX(-7px) rotate(-.2deg)" },
      { transform: "translateX(6px) rotate(.2deg)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 520, easing: "ease-in-out" },
  );
  showToast("Upsi. Niemand weiß, was dieser Knopf tut. Perfekt.");
}

function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      !SUPABASE_URL.includes("YOUR_SUPABASE") &&
      !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE"),
  );
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra,
  };
}

async function supabaseSelect(table, query) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: supabaseHeaders(),
  });
  if (!response.ok) throw new Error(`Supabase ${table}: ${response.status}`);
  return response.json();
}

async function supabaseInsert(table, payload) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: supabaseHeaders({ "Content-Type": "application/json", Prefer: "return=minimal" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Supabase ${table}: ${response.status}`);
}

async function loadLiveData() {
  if (!isSupabaseConfigured()) return;
  try {
    const [entries, comments, reactions] = await Promise.all([
      supabaseSelect("entries", "select=*&order=created_at.desc"),
      supabaseSelect("comments", "select=*&order=created_at.asc"),
      supabaseSelect("reactions", "select=entry_id,emoji"),
    ]);
    if (!Array.isArray(entries) || !entries.length) return;

    const counts = {};
    for (const reaction of reactions || []) {
      counts[reaction.entry_id] ||= {};
      const normalizedEmoji = reaction.emoji === "🤦‍♀️" ? "🤦" : reaction.emoji;
      counts[reaction.entry_id][normalizedEmoji] = (counts[reaction.entry_id][normalizedEmoji] || 0) + 1;
    }

    state.entries = entries.map((entry) => ({ ...entry, author: entry.author || "Schweini" }));
    state.comments = comments || [];
    state.reactionCounts = counts;
    state.connected = true;
    updateTicker();
    renderRoute({ preserveScroll: true });
  } catch (error) {
    console.warn("Schweini-Funk bleibt im Vorschau-Modus.", error);
  }
}

function updateTicker() {
  const ticker = document.querySelector(".news-ticker__viewport span");
  if (!ticker) return;
  const photos = state.entries.reduce((sum, entry) => sum + (entry.images?.length || 0), 0);
  ticker.textContent = `${state.entries.length} Abenteuer · ${photos} Fotos · ${state.comments.length} Kommentare · Chaos-Level 9000 · Schweini fordert mehr Kuchen ·`;
}

function finishIntro() {
  const intro = document.querySelector("#intro");
  intro?.classList.add("is-finished");
  document.body.classList.remove("intro-lock");
  sessionStorage.setItem("schweini-intro-seen-v1", "true");
}

function playIntro() {
  const current = document.querySelector("#intro");
  const fresh = current.cloneNode(true);
  current.replaceWith(fresh);
  document.body.classList.add("intro-lock");
  window.setTimeout(finishIntro, 3500);
}

function initIntro() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || sessionStorage.getItem("schweini-intro-seen-v1")) {
    finishIntro();
    return;
  }
  window.setTimeout(finishIntro, 3500);
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest(".menu-toggle")) {
    openMenu();
    return;
  }
  if (target.closest("[data-close-menu]") || target.closest(".menu-sheet a")) {
    closeMenu();
  }
  if (target.closest(".open-post-dialog")) {
    openPostDialog();
    return;
  }
  if (target.closest("[data-close-dialog]")) {
    closePostDialog();
    return;
  }
  if (target.closest("#intro-replay")) {
    playIntro();
    return;
  }

  const heroButton = target.closest("[data-hero-index]");
  if (heroButton) {
    setHeroSlide(Number(heroButton.dataset.heroIndex), true);
    return;
  }

  const reactionButton = target.closest("[data-reaction]");
  if (reactionButton) {
    handleReaction(reactionButton);
    return;
  }

  const filterButton = target.closest("[data-diary-filter]");
  if (filterButton) {
    handleDiaryFilter(filterButton.dataset.diaryFilter);
    return;
  }

  const galleryButton = target.closest("[data-lightbox-entry]");
  if (galleryButton) {
    openLightbox(galleryButton.dataset.lightboxEntry, Number(galleryButton.dataset.lightboxIndex));
    return;
  }
  if (target.closest("[data-close-lightbox]")) {
    lightbox.close();
    return;
  }
  if (target.closest("[data-lightbox-prev]")) {
    moveLightbox(-1);
    return;
  }
  if (target.closest("[data-lightbox-next]")) {
    moveLightbox(1);
    return;
  }

  const buyButton = target.closest("[data-buy]");
  if (buyButton) {
    showToast(`${buyButton.dataset.buy}: ausverkauft, weil Schweini alles selbst behalten hat.`);
    return;
  }

  const memoryButton = target.closest("[data-memory-index]");
  if (memoryButton) {
    handleMemoryCard(Number(memoryButton.dataset.memoryIndex));
    return;
  }
  if (target.closest("[data-memory-restart]")) {
    restartMemory();
    return;
  }
  if (target.closest("[data-oracle]")) {
    askOracle();
    return;
  }
  if (target.closest("[data-chaos]")) {
    triggerChaos();
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.matches("[data-comment-form]")) {
    event.preventDefault();
    handleCommentSubmit(form);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    if (postDialog.open) postDialog.close();
  }
  if (lightbox.open && event.key === "ArrowLeft") moveLightbox(-1);
  if (lightbox.open && event.key === "ArrowRight") moveLightbox(1);
});

postForm.addEventListener("submit", handleFamilyPostSubmit);
postForm.elements.images.addEventListener("change", (event) => handleUploads(event.target));
postDialog.addEventListener("click", (event) => {
  if (event.target === postDialog) closePostDialog();
});
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
window.addEventListener("hashchange", () => renderRoute());
window.addEventListener("resize", fitHeroLines);

renderRoute();
updateTicker();
initIntro();
loadLiveData();

document.fonts?.ready.then(fitHeroLines);
