// 추가: 햄버거 메뉴 열기/닫기
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const gnbLinks = document.querySelectorAll('#gnb a');

menuBtn.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

// 메뉴 링크를 누르면 메뉴 닫기
gnbLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', '메뉴 열기');
  });
});