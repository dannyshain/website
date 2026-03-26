// ── Theme toggle ──────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const themeIcon = themeBtn.querySelector(".theme-icon");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") || "dark");

themeBtn.addEventListener("click", () => {
  applyTheme(html.dataset.theme === "dark" ? "light" : "dark");
});

// ── Typewriter ────────────────────────────────────────────────
const phrases = [
  "write content that ranks—and gets cited.",
  "explain technical concepts to any audience.",
  "craft systems that build trust and convert.",
  "help clarify your brand and your value.",
  "build content programs that work.",
];

const typeEl = document.querySelector(".typewriter");

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let pausingAtEnd = false;

const TYPE_SPEED   = 58;
const DELETE_SPEED = 32;
const PAUSE_END    = 2600;
const PAUSE_START  = 600;

function tick() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typeEl.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(tick, PAUSE_END);
      return;
    }
    setTimeout(tick, TYPE_SPEED);
  } else {
    typeEl.textContent = phrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, PAUSE_START);
      return;
    }
    setTimeout(tick, DELETE_SPEED);
  }
}

tick();

// ── Active nav on scroll ──────────────────────────────────────
const sections = document.querySelectorAll("main [id]");
const navLinks = document.querySelectorAll(".nav-links a[data-nav]");

const sectionObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        for (const link of navLinks) {
          link.classList.toggle("is-active", link.dataset.nav === entry.target.id);
        }
      }
    }
  },
  { rootMargin: "-30% 0px -20% 0px" }
);

for (const section of sections) {
  sectionObserver.observe(section);
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1 }
);

for (const item of revealItems) {
  revealObserver.observe(item);
}

// ── Email obfuscation ─────────────────────────────────────────
const emailBtn = document.getElementById("emailBtn");
if (emailBtn) {
  const parts = ["DanielShain", "gmail", "com"];
  emailBtn.href = `mailto:${parts[0]}@${parts[1]}.${parts[2]}`;
}

// ── Auto year ─────────────────────────────────────────────────
const yearNode = document.querySelector("[data-year]");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
