/* 헤더 메뉴 */
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector(".header-menu-toggle");
  const closeButton = document.querySelector(".mobile-menu-close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  const pcMenu = document.querySelector(".header-subnav");

  if (!mobileMenu || !backdrop) return;

  // 모바일 메뉴를 열고 닫으며 화면 스크롤을 제어합니다.
  const setMobileMenu = (isOpen) => {
    mobileMenu.classList.toggle("is-open", isOpen);
    backdrop.classList.toggle("is-open", isOpen);
    openButton?.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  openButton?.addEventListener("click", () => setMobileMenu(true));
  closeButton?.addEventListener("click", () => setMobileMenu(false));
  backdrop.addEventListener("click", () => setMobileMenu(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenu(false);
  });

  // PC 네비게이션에 포인터나 키보드가 닿으면 서브메뉴를 표시합니다.
  const header = document.querySelector(".site-header");
  header?.addEventListener("mouseenter", () => pcMenu?.classList.add("is-open"));
  header?.addEventListener("mouseleave", () => pcMenu?.classList.remove("is-open"));
  header?.addEventListener("focusin", () => pcMenu?.classList.add("is-open"));
  header?.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) pcMenu?.classList.remove("is-open");
  });

  // 모바일 메뉴의 각 항목을 아코디언으로 펼치고 접습니다.
  document.querySelectorAll(".mobile-menu-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".mobile-menu-item");
      const isOpen = item?.classList.toggle("is-open") ?? false;
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
});

/* 무료 체험 섹션 등장 효과 */
document.addEventListener("DOMContentLoaded", () => {
  const trialSection = document.querySelector(".trial-section");
  if (!trialSection) return;

  // 무료 체험 섹션이 화면에 들어오면 문구와 장식 도형을 표시합니다.
  const revealTrialSection = (entries, observer) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    trialSection.classList.add("is-visible");
    observer.disconnect();
  };

  const trialObserver = new IntersectionObserver(revealTrialSection, { threshold: 0.2 });
  trialObserver.observe(trialSection);
});

/* PC 탑버튼 */
document.addEventListener("DOMContentLoaded", () => {
  const topButton = document.querySelector(".page-top-button");
  if (!topButton) return;

  // 탑버튼을 누르면 페이지 맨 위로 이동합니다.
  const scrollToPageTop = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  topButton.addEventListener("click", scrollToPageTop);
});
