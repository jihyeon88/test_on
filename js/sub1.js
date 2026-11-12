/* 학습안내 탭 */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".sub1-tab");
  if (!tabs.length) return;

  // 선택한 학습안내 탭에 현재 상태를 표시합니다.
  const setActiveTab = (selectedTab) => {
    tabs.forEach((tab) => {
      const isActive = tab === selectedTab;
      tab.classList.toggle("is-active", isActive);
      if (isActive) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveTab(tab);
    });
  });
});

/* 스크롤 이미지 등장 애니메이션 */
document.addEventListener("DOMContentLoaded", () => {
  const animatedImages = document.querySelectorAll(
    ".sub1-reason-image-wrap, .sub1-method-image-wrap, .sub1-reason-copy, .sub1-method-copy"
  );
  if (!animatedImages.length) return;

  // 이미지가 화면에 들어오면 방향에 맞춰 표시하고 관찰을 마칩니다.
  const revealImage = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    animatedImages.forEach((image) => image.classList.add("is-visible"));
    return;
  }

  const imageObserver = new IntersectionObserver(revealImage, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });
  animatedImages.forEach((image) => imageObserver.observe(image));
});

/* 섹션 제목 줄별 스크롤 애니메이션 */
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".sub1-reasons-heading, .sub1-method-heading");
  if (!headings.length) return;

  // 섹션 제목이 화면에 들어오면 각 제목 줄을 순서대로 표시합니다.
  const revealHeading = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    headings.forEach((heading) => heading.classList.add("is-visible"));
    return;
  }

  const headingObserver = new IntersectionObserver(revealHeading, {
    threshold: 0.2,
    rootMargin: "0px 0px -30px 0px"
  });
  headings.forEach((heading) => headingObserver.observe(heading));
});


