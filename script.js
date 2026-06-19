const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const bookingLinks = document.querySelectorAll("[data-booking-link]");

function trackEvent(name, parameters = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, parameters);
  }
}

bookingLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("booking_form_click", {
      link_url: link.href,
      link_text: link.textContent.trim(),
      link_location: link.dataset.bookingLink,
    });
  });
});

const engagementMilestones = [30, 60, 120, 300];
const reachedMilestones = new Set();
let visibleTimeMs = 0;
let visibleSince = document.visibilityState === "visible" ? performance.now() : null;

function getVisibleTimeMs() {
  if (visibleSince === null) {
    return visibleTimeMs;
  }

  return visibleTimeMs + performance.now() - visibleSince;
}

function recordEngagementMilestones() {
  const visibleSeconds = Math.floor(getVisibleTimeMs() / 1000);

  engagementMilestones.forEach((seconds) => {
    if (visibleSeconds >= seconds && !reachedMilestones.has(seconds)) {
      reachedMilestones.add(seconds);
      trackEvent("engagement_milestone", {
        engagement_seconds: seconds,
        milestone_label: `${seconds}_seconds`,
      });
    }
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && visibleSince !== null) {
    visibleTimeMs += performance.now() - visibleSince;
    visibleSince = null;
    return;
  }

  if (document.visibilityState === "visible" && visibleSince === null) {
    visibleSince = performance.now();
  }
});

window.setInterval(recordEngagementMilestones, 1000);

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
