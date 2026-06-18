const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

toggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) {
    header.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
