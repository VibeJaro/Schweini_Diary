const heroSlides = [
  {
    image: "public/images/8_4.png",
    alt: "Schweini als Actionheld vor einer Filmkamera",
    lineOne: "Chef",
    lineTwo: "im Dienst.",
    lineThree: "Das war echte",
    lineFour: "Kuchenarbeit.",
    deck: "Schweini auf wichtiger Dienstreise. Mit großem Hunger, noch größerem Auftritt und exakt null Zurückhaltung.",
    caption: "Wichtige Konferenz, angeblich",
    communityTitle: "„Arbeit“ – wir möchten Beweise.",
    communityCopy: "Maja und 52 weitere Chaos-Expert:innen diskutieren schon."
  },
  {
    image: "public/images/8_8.png",
    alt: "Schweini als geheimnisvoller Superschurke mit weißer Katze",
    lineOne: "Natürlich",
    lineTwo: "berühmt.",
    lineThree: "Mein Talent ist",
    lineFour: "unfassbar.",
    deck: "Ein schwarzer Sessel, eine weiße Katze und pure Eleganz. Hollywood war auf so viel Rüssel-Charisma nicht vorbereitet.",
    caption: "Weltruhm, völlig logisch",
    communityTitle: "Der Oinkscar geht an … Schweini.",
    communityCopy: "Er wollte nur kurz danken. Drei Stunden später …"
  },
  {
    image: "public/images/8_11.png",
    alt: "Schweini hält bei einer großen Preisverleihung eine Rede",
    lineOne: "Danke.",
    lineTwo: "An mich.",
    lineThree: "Für mein schieres",
    lineFour: "Können.",
    deck: "Schweini gewinnt in der Kategorie „Bester Schweini“. Überraschend gab es keine ernsthafte Konkurrenz.",
    caption: "Triumph, absolut verdient",
    communityTitle: "Wo ist der Pokal, Schweini?",
    communityCopy: "Elisa fordert Einsicht in die geheime Schatzkammer."
  }
];

const intro = document.querySelector("#intro");
const replayIntroButton = document.querySelector("#intro-replay");
const heroStage = document.querySelector("#hero-stage");
const heroTitle = document.querySelector("#hero-title");
const heroDeck = document.querySelector("#hero-deck");
const heroImage = document.querySelector("#hero-image");
const heroCaption = document.querySelector("#hero-caption");
const heroCommunityTitle = document.querySelector("#hero-community-title");
const heroCommunityCopy = document.querySelector("#hero-community-copy");
const heroDots = [...document.querySelectorAll(".hero-dot")];
const heroPrevious = document.querySelector("#hero-previous");
const heroNext = document.querySelector("#hero-next");
const toast = document.querySelector("#toast");
const postDialog = document.querySelector("#post-dialog");
const postForm = document.querySelector("#post-form");
const gameDialog = document.querySelector("#game-dialog");
const memoryGrid = document.querySelector("#memory-grid");
const gameStatus = document.querySelector("#game-status");

let introTimer;
let currentHeroIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let toastTimer;
let firstMemoryCard = null;
let memoryLocked = false;
let matchedPairs = 0;

function playIntro() {
  window.clearTimeout(introTimer);
  intro.classList.remove("is-finished");
  intro.querySelectorAll(".intro-panel, .intro-mark, .intro-signature, .intro-noise, .intro-flash").forEach((element) => {
    element.style.animation = "none";
    void element.offsetWidth;
    element.style.animation = "";
  });
  document.body.classList.add("intro-lock");

  introTimer = window.setTimeout(() => {
    intro.classList.add("is-finished");
    document.body.classList.remove("intro-lock");
  }, 3450);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function updateHero(nextIndex) {
  const safeIndex = (nextIndex + heroSlides.length) % heroSlides.length;
  if (safeIndex === currentHeroIndex) return;

  heroStage.classList.add("is-switching");
  heroTitle.classList.add("is-switching");
  heroDeck.classList.add("is-switching");

  window.setTimeout(() => {
    currentHeroIndex = safeIndex;
    const slide = heroSlides[currentHeroIndex];

    heroImage.src = slide.image;
    heroImage.alt = slide.alt;
    document.querySelector("#hero-line-one").textContent = slide.lineOne;
    document.querySelector("#hero-line-two").textContent = slide.lineTwo;
    document.querySelector("#hero-line-three").textContent = slide.lineThree;
    document.querySelector("#hero-line-four").textContent = slide.lineFour;
    heroDeck.textContent = slide.deck;
    heroCaption.textContent = slide.caption;
    heroCommunityTitle.textContent = slide.communityTitle;
    heroCommunityCopy.textContent = slide.communityCopy;

    heroDots.forEach((dot, index) => {
      const isActive = index === currentHeroIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });

    heroStage.classList.remove("is-switching");
    heroTitle.classList.remove("is-switching");
    heroDeck.classList.remove("is-switching");
  }, 180);
}

function openPostDialog() {
  if (!postDialog.open) postDialog.showModal();
}

function closeDialogById(id) {
  const dialog = document.getElementById(id);
  if (dialog?.open) dialog.close();
}

function addPrototypeComment(identity, message) {
  const article = document.createElement("article");
  article.className = "comment-card comment-card--yellow";
  article.innerHTML = `
    <header>
      <span class="avatar">${identity.slice(0, 1)}</span>
      <div><strong></strong><small>gerade gepostet</small></div>
    </header>
    <p></p>
    <span class="comment-card__time">gerade eben</span>
  `;
  article.querySelector("strong").textContent = identity;
  article.querySelector("p").textContent = `„${message}“`;
  document.querySelector("#comment-stack").prepend(article);
}

function shuffle(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function setupMemoryGame() {
  firstMemoryCard = null;
  memoryLocked = false;
  matchedPairs = 0;
  gameStatus.textContent = "Finde die drei Paare!";
  memoryGrid.innerHTML = "";

  shuffle(["🐷", "🐷", "🍰", "🍰", "🚀", "🚀"]).forEach((symbol, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-card";
    button.dataset.symbol = symbol;
    button.setAttribute("aria-label", `Verdeckte Karte ${index + 1}`);
    button.textContent = symbol;
    button.addEventListener("click", () => revealMemoryCard(button));
    memoryGrid.append(button);
  });
}

function revealMemoryCard(card) {
  if (memoryLocked || card.classList.contains("is-visible") || card.classList.contains("is-matched")) return;

  card.classList.add("is-visible");
  card.setAttribute("aria-label", `Aufgedeckte Karte: ${card.dataset.symbol}`);

  if (!firstMemoryCard) {
    firstMemoryCard = card;
    return;
  }

  if (firstMemoryCard.dataset.symbol === card.dataset.symbol) {
    firstMemoryCard.classList.add("is-matched");
    card.classList.add("is-matched");
    firstMemoryCard = null;
    matchedPairs += 1;
    gameStatus.textContent = `${matchedPairs} von 3 Paaren gefunden.`;

    if (matchedPairs === 3) {
      gameStatus.textContent = "Gewonnen! Schweini verlangt trotzdem Kuchen.";
      showToast("🐷 Schweini ist beeindruckt. Fast so sehr wie von sich selbst.");
    }
    return;
  }

  memoryLocked = true;
  const previousCard = firstMemoryCard;
  firstMemoryCard = null;
  window.setTimeout(() => {
    previousCard.classList.remove("is-visible");
    card.classList.remove("is-visible");
    previousCard.setAttribute("aria-label", "Verdeckte Karte");
    card.setAttribute("aria-label", "Verdeckte Karte");
    memoryLocked = false;
  }, 700);
}

replayIntroButton.addEventListener("click", playIntro);
heroPrevious.addEventListener("click", () => updateHero(currentHeroIndex - 1));
heroNext.addEventListener("click", () => updateHero(currentHeroIndex + 1));
heroDots.forEach((dot, index) => dot.addEventListener("click", () => updateHero(index)));

heroStage.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

heroStage.addEventListener("touchend", (event) => {
  const xDistance = event.changedTouches[0].clientX - touchStartX;
  const yDistance = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(xDistance) > 48 && Math.abs(xDistance) > Math.abs(yDistance)) {
    updateHero(currentHeroIndex + (xDistance < 0 ? 1 : -1));
  }
}, { passive: true });

document.querySelectorAll(".reaction").forEach((button) => {
  button.addEventListener("click", () => {
    const active = button.classList.toggle("is-reacted");
    const count = Number(button.dataset.count) + (active ? 1 : 0);
    button.querySelector("span").textContent = count;
    showToast(active ? "Reaktion an Schweini gesendet." : "Reaktion wieder zurückgenommen.");
  });
});

document.querySelectorAll(".open-post-dialog").forEach((button) => {
  button.addEventListener("click", openPostDialog);
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => closeDialogById(button.dataset.closeDialog));
});

[postDialog, gameDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(postForm);
  const identity = String(formData.get("identity") || "Familie");
  const message = String(formData.get("message") || "").trim();
  if (!message) return;

  addPrototypeComment(identity, message);
  postForm.reset();
  postDialog.close();
  showToast(`${identity}s Nachricht ist in der Schweinewelt gelandet.`);
  document.querySelector("#community").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(`${button.dataset.product} reserviert. Es wurde garantiert nichts abgebucht.`);
  });
});

document.querySelector("#load-more").addEventListener("click", (event) => {
  const bonusStory = document.querySelector("#bonus-story");
  const isHidden = bonusStory.hidden;
  bonusStory.hidden = !isHidden;
  event.currentTarget.querySelector("span:first-child").textContent = isHidden ? "Archiv wieder schließen" : "Mehr Heldentaten laden";
  event.currentTarget.querySelector("span:last-child").textContent = isHidden ? "↑" : "↓";
  if (isHidden) bonusStory.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#open-game").addEventListener("click", () => {
  setupMemoryGame();
  gameDialog.showModal();
});

document.querySelector("#game-restart").addEventListener("click", setupMemoryGame);

document.querySelector("#chaos-button").addEventListener("click", () => {
  document.body.classList.remove("chaos-shake");
  void document.body.offsetWidth;
  document.body.classList.add("chaos-shake");
  showToast("Chaos-Level 9001. Upsi.");
});

const observedSections = ["start", "abenteuer", "community", "laden", "spielplatz"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleEntry = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visibleEntry) return;

  const activeSection = visibleEntry.target.id === "community" ? "abenteuer" : visibleEntry.target.id;
  document.querySelectorAll(".bottom-nav__item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.section === activeSection);
  });
}, {
  rootMargin: "-30% 0px -55% 0px",
  threshold: [0.05, 0.25, 0.5]
});

observedSections.forEach((section) => sectionObserver.observe(section));

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  intro.classList.add("is-finished");
  document.body.classList.remove("intro-lock");
} else {
  playIntro();
}
