const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const bookingLinks = document.querySelectorAll("[data-booking-link]");
const testimonialRoot = document.querySelector("[data-testimonials]");
const testimonialCarousel = document.querySelector("[data-testimonial-carousel]");
const testimonialPrev = document.querySelector("[data-testimonial-prev]");
const testimonialNext = document.querySelector("[data-testimonial-next]");
const testimonialStatus = document.querySelector("[data-testimonial-status]");
const testimonialDialog = document.querySelector("[data-testimonial-dialog]");
const dialogClose = document.querySelector("[data-dialog-close]");
const dialogIssue = document.querySelector("[data-dialog-issue]");
const dialogName = document.querySelector("[data-dialog-name]");
const dialogDate = document.querySelector("[data-dialog-date]");
const dialogContent = document.querySelector("[data-dialog-content]");

const testimonials = [
  {
    name: "品管工程師",
    date: "2026-05",
    displayDate: true,
    issue: "面臨裁員，調適與發展方向",
    content:
      "諮詢中最有幫助的是把經驗用比較正向的方式重新整理，也看見自己擅長的部分。原本面對裁員和下一步發展有很多不安，談完後比較能理解自己的能力，也比較知道可以怎麼往前看。",
  },
  {
    name: "科技業務",
    date: "2026-05",
    displayDate: true,
    issue: "業務轉職諮商心理師",
    content:
      "透過牌卡和生涯建構訪談，我更了解自己的職涯能力、價值觀、興趣和優勢。諮詢師適時鼓勵與肯定，也陪我把備考和考試過程拆成實際行動，幫助我跳脫原本的焦慮迴圈，真的開始行動起來。",
  },
  {
    name: "運輸業工作者",
    date: "2026-05",
    displayDate: true,
    issue: "發展可能性探索",
    content:
      "謝謝 Tony 協助我釐清在職場碰到的困難，也讓我更有自信可以向前追尋自己想要的工作。過程中不只看見自己的優勢與劣勢，也知道如何透過方法和工具，一步一步讓自己接近目標。",
  },
  {
    name: "畢業生",
    date: "2026-06",
    displayDate: true,
    issue: "教職與研究所抉擇",
    content:
      "最近面臨生涯抉擇，很謝謝俊豪諮詢師細心傾聽和給出具體建議。討論自己的優劣勢時，我突然發現與其一直花力氣補足缺點，不如好好放大自己的優勢，效益反而更大，有種茅塞頓開的感覺。",
  },
  {
    name: "講座參與者",
    date: "2026-06",
    displayDate: true,
    issue: "理解諮商行業與職涯判斷",
    content:
      "這場活動幫助我理解諮商這個行業，也用個性、能力、價值觀來區分職涯選擇。比起只聽資訊，更重要的是開始知道怎麼判斷一份工作是不是符合自己，對接下來的行動很有幫助。",
  },
  {
    name: "講座參與者",
    date: "2026-06",
    displayDate: true,
    issue: "諮商過程與人際互動學習",
    content:
      "整體受益匪淺，也很值得分享。活動讓我更了解諮商過程與技巧，也提醒我未來可以多精進與人相處的方式。過程中態度溫暖真誠，也能協助釐清問題和想法。",
  },
  {
    name: "講座參與者",
    date: "2026-06",
    displayDate: true,
    issue: "團體講座中的意外收穫",
    content:
      "原本以為只是一起做活動、互相分享經驗，沒想到內容比預期更像完整的諮商指導，精彩、有趣，也有意外收穫。能用很高 CP 值的方式交流這門專業，讓我對心理諮商與臨床心理相關學習更感興趣。",
  },
];

let testimonialIndex = 0;
let visibleTestimonials = 3;

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

function renderTestimonials() {
  if (!testimonialRoot) {
    return;
  }

  testimonialRoot.innerHTML = "";

  testimonials.forEach((testimonial, index) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";

    const content = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = testimonial.name;

    const issue = document.createElement("span");
    issue.className = "testimonial-issue";
    issue.textContent = testimonial.issue;

    const quote = document.createElement("p");
    quote.className = "testimonial-content";
    quote.textContent = testimonial.content;

    content.append(name, issue, quote);

    const footer = document.createElement("div");
    footer.className = "testimonial-footer";

    const date = document.createElement("span");
    date.className = "testimonial-date";
    date.textContent = testimonial.displayDate ? testimonial.date : "";

    const button = document.createElement("button");
    button.className = "text-button";
    button.type = "button";
    button.dataset.testimonialIndex = String(index);
    button.textContent = "展開";

    footer.append(date, button);
    card.append(content, footer);
    testimonialRoot.append(card);
  });

  updateTestimonialCarousel();
}

function getVisibleTestimonials() {
  if (!testimonialRoot) {
    return 1;
  }

  const columns = getComputedStyle(testimonialRoot).getPropertyValue("--testimonial-columns");
  return Math.max(1, Number(columns.trim()) || 1);
}

function updateTestimonialCarousel() {
  if (!testimonialRoot) {
    return;
  }

  visibleTestimonials = getVisibleTestimonials();
  const maxIndex = Math.max(0, testimonials.length - visibleTestimonials);
  testimonialIndex = Math.min(testimonialIndex, maxIndex);

  const firstCard = testimonialRoot.querySelector(".testimonial-card");
  const gap = Number(getComputedStyle(testimonialRoot).columnGap.replace("px", "")) || 0;
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 0;
  const offset = testimonialIndex * (cardWidth + gap);

  testimonialRoot.style.transform = `translateX(${-offset}px)`;
  testimonialPrev?.toggleAttribute("disabled", testimonialIndex === 0);
  testimonialNext?.toggleAttribute("disabled", testimonialIndex >= maxIndex);

  if (testimonialStatus) {
    const start = testimonials.length === 0 ? 0 : testimonialIndex + 1;
    const end = Math.min(testimonialIndex + visibleTestimonials, testimonials.length);
    testimonialStatus.textContent = `${start}-${end} / ${testimonials.length}`;
  }
}

function moveTestimonials(direction) {
  const maxIndex = Math.max(0, testimonials.length - visibleTestimonials);
  testimonialIndex = Math.min(Math.max(testimonialIndex + direction, 0), maxIndex);
  updateTestimonialCarousel();
}

function openTestimonial(index) {
  const testimonial = testimonials[index];
  if (!testimonial || !testimonialDialog || !dialogIssue || !dialogName || !dialogDate || !dialogContent) {
    return;
  }

  dialogIssue.textContent = testimonial.issue;
  dialogName.textContent = testimonial.name;
  dialogDate.textContent = testimonial.displayDate ? testimonial.date : "";
  dialogContent.textContent = testimonial.content;

  if (typeof testimonialDialog.showModal === "function") {
    testimonialDialog.showModal();
    return;
  }

  testimonialDialog.setAttribute("open", "");
}

testimonialRoot?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || target.dataset.testimonialIndex === undefined) {
    return;
  }

  openTestimonial(Number(target.dataset.testimonialIndex));
});

testimonialPrev?.addEventListener("click", () => {
  moveTestimonials(-1);
});

testimonialNext?.addEventListener("click", () => {
  moveTestimonials(1);
});

dialogClose?.addEventListener("click", () => {
  testimonialDialog?.close();
});

testimonialDialog?.addEventListener("click", (event) => {
  if (event.target === testimonialDialog) {
    testimonialDialog.close();
  }
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
window.addEventListener("resize", updateTestimonialCarousel);
updateHeader();
renderTestimonials();
