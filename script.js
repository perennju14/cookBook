/**
 * Utilitaires DOM
 */
const select = (selector, scope = document) => scope.querySelector(selector);

const selectAll = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

/**
 * Footer - Année dynamique
 */
const yearEl = select("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/**
 * Navigation mobile
 */
const navToggle = select("#navToggle");
const mobileNav = select("#mobileNav");

if (navToggle && mobileNav) {
  // Toggle menu
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
    navToggle.classList.toggle("active", !isOpen);
  });

  // Fermer au clic sur un lien
  selectAll(".nav-mobile__link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.hidden = true;
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("active");
    });
  });
}

/**
 * Header - Effet au scroll
 */
const header = select("#header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
  });
}

/**
 * Smooth scroll
 */
selectAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = select(targetId);

    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/**
 * Animations au scroll (Intersection Observer)
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.style.opacity = "1";
    entry.target.style.transform = "translateY(0)";
    observer.unobserve(entry.target);
  });
}, observerOptions);

/**
 * Éléments animés
 */
const animatedElements = [
  ...selectAll(".price-card"),
  ...selectAll(".feature"),
];

animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});
