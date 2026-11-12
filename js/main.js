/* 메인 배너 공지사항 슬라이드 */
document.addEventListener("DOMContentLoaded", () => {
  const notices = [
    { title: "Grammar 문제에 관하여!", date: "2026.10.21", href: "#notice-1" },
    { title: "English ONE 학습 안내", date: "2026.10.15", href: "#notice-2" },
    { title: "커리큘럼 안내", date: "2026.10.01", href: "#notice-3" },
  ];
  const title = document.querySelector(".notice-title");
  const date = document.querySelector(".notice-slide time");
  const slideLink = document.querySelector(".notice-slide");
  const counter = document.querySelector(".notice-counter");
  const previousButton = document.querySelector(".notice-prev");
  const nextButton = document.querySelector(".notice-next");

  if (!title || !date || !slideLink || !counter || !previousButton || !nextButton) return;
  let currentIndex = 0;

  // 선택된 공지 내용을 카드에 표시합니다.
  const renderNotice = () => {
    const notice = notices[currentIndex];
    title.textContent = notice.title;
    date.textContent = notice.date;
    date.dateTime = notice.date.replaceAll(".", "-");
    slideLink.href = notice.href;
    counter.textContent = `${currentIndex + 1} / ${notices.length}`;
  };

  // 공지사항을 앞이나 뒤로 한 장씩 순환합니다.
  const moveNotice = (direction) => {
    currentIndex = (currentIndex + direction + notices.length) % notices.length;
    renderNotice();
  };

  previousButton.addEventListener("click", () => moveNotice(-1));
  nextButton.addEventListener("click", () => moveNotice(1));
  renderNotice();
});

/* 콘텐츠 소개 섹션 등장 효과 */
document.addEventListener("DOMContentLoaded", () => {
  const introSections = document.querySelectorAll(".content-intro");
  if (!introSections.length) return;

  // 각 섹션이 화면에 들어오면 제목과 학습 카드의 등장 애니메이션을 시작합니다.
  const revealIntroSections = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  };

  const introObserver = new IntersectionObserver(revealIntroSections, { threshold: 0.12 });
  introSections.forEach((section) => introObserver.observe(section));
});

/* 05 시안: 학습 결과 슬라이드 */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".journey-track");
  const pagination = document.querySelector(".journey-pagination");
  if (!track || !pagination) return;

  // 슬라이드를 추가할 때는 이 목록에 이미지, 카드 제목, 제목 색상 테마를 추가합니다.
  const slideContents = [
    {
      image: "img/slide-image-1.jpg",
      title: "가르치는 쌤이 직접 제작한 자료",
      description: "자료 전체가 티칭 경력 20년 이상의 선생님들이 학생들의 약점을 정확하게 분석하여 직접 제작한 고품질 학습 콘텐츠로 구성되어 있습니다.",
      theme: "light",
    },
    {
      image: "img/slide-image-2.jpg",
      title: "단계별 학습이 목표",
      description: "학습 목표에 맞춰 단계를 차근차근 밟아가며, 배운 내용을 실력으로 연결할 수 있도록 구성했습니다.",
      theme: "dark",
    },
    {
      image: "img/slide-image-3.jpg",
      title: "한눈에 확인하는 학습 성과",
      description: "학습 결과를 확인하고 다음 목표를 세워 꾸준한 성장을 이어갈 수 있습니다.",
      theme: "dark",
    },
    {
      image: "img/slide-image-4.jpg",
      title: "영어의 모든 영역을 한 번에",
      description: "단어와 문법부터 듣기와 영작까지, 다양한 영어 학습을 한 곳에서 이어갑니다.",
      theme: "light",
    },
    {
      image: "img/slide-image-5.jpg",
      title: "가맹비 없는 온라인 학습",
      description: "온라인으로 언제 어디서나 필요한 영어 학습 콘텐츠를 이용할 수 있습니다.",
      theme: "dark",
    },
  ];
  // 5개 배경 이미지를 순환해 총 12장의 슬라이드 데이터를 구성합니다.
  const slides = Array.from({ length: 12 }, (_, index) => slideContents[index % slideContents.length]);
  const slideButtons = [];
  const dotButtons = [];
  let activeIndex = 0;

  // 슬라이드와 페이지 점을 데이터 목록에 맞춰 생성합니다.
  const createSlides = () => {
    slides.forEach((slide, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "journey-slide";
      card.dataset.theme = slide.theme;
      card.setAttribute("aria-label", `${index + 1}번 슬라이드: ${slide.title}`);
      card.innerHTML = `<span class="journey-slide-media"><img class="journey-slide-image" src="${slide.image}" alt=""><span class="journey-slide-title">${slide.title}</span></span><span class="journey-slide-copy"><span class="journey-slide-copy-title">${slide.title}</span><span class="journey-slide-copy-description">${slide.description}</span></span>`;
      card.addEventListener("click", () => setActiveSlide(index));
      track.append(card);
      slideButtons.push(card);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `${index + 1}번 슬라이드로 이동`);
      dot.addEventListener("click", () => setActiveSlide(index));
      pagination.append(dot);
      dotButtons.push(dot);
    });
  };

  // 화면 크기와 현재 슬라이드에 맞춰 각 카드의 좌우 위치를 계산합니다.
  const positionSlides = () => {
    const viewportWidth = window.innerWidth;
    const step = viewportWidth <= 600
      ? viewportWidth * 0.78
      : viewportWidth <= 1024
        ? viewportWidth * 0.48
        : Math.min(viewportWidth * 0.27, 520);

    slideButtons.forEach((card, index) => {
      let offset = index - activeIndex;
      if (offset > slides.length / 2) offset -= slides.length;
      if (offset < -slides.length / 2) offset += slides.length;
      card.style.setProperty("--slide-shift", `${offset * step}px`);
      card.classList.toggle("is-active", offset === 0);
      card.classList.toggle("is-hidden", Math.abs(offset) > 2);
      dotButtons[index].setAttribute("aria-current", String(offset === 0));
    });
  };

  // 선택한 슬라이드를 가운데로 이동하고 페이지 점을 갱신합니다.
  function setActiveSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    positionSlides();
  }

  createSlides();
  positionSlides();
  window.addEventListener("resize", positionSlides);
});

/* 메인 배너 레이어 팝업 */
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".main-popup");
  const todayCheck = popup?.querySelector(".main-popup-check");
  const closeButton = popup?.querySelector(".main-popup-close");
  if (!popup || !todayCheck || !closeButton) return;

  const storageKey = "englishOnePopupHiddenDate";
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date());

  try {
    if (window.localStorage.getItem(storageKey) === today) {
      popup.classList.add("is-closed");
      popup.setAttribute("aria-hidden", "true");
      return;
    }
  } catch (error) {
    // 저장소를 사용할 수 없는 환경에서는 이번 방문 동안만 팝업을 표시합니다.
  }

  // 체크 상태에 따라 오늘 다시 보지 않도록 저장하고 팝업을 닫습니다.
  const closePopup = () => {
    if (todayCheck.checked) {
      try {
        window.localStorage.setItem(storageKey, today);
      } catch (error) {
        // 저장소를 사용할 수 없는 경우에도 현재 팝업은 닫습니다.
      }
    }
    popup.classList.add("is-closed");
    popup.setAttribute("aria-hidden", "true");
  };

  closeButton.addEventListener("click", closePopup);
});
