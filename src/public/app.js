// 홈 화면 로직: /api/home 에서 히어로 + 카테고리 목록을 받아 렌더링합니다.

const nav = document.getElementById('nav');
const hero = document.getElementById('hero');
const rows = document.getElementById('rows');

// 스크롤하면 네비게이션 배경을 진하게
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

function renderHero(movie) {
  hero.style.backgroundImage = `url(${movie.backdrop})`;
  hero.innerHTML = `
    <div class="hero__content">
      <h1 class="hero__title">${movie.title}</h1>
      <div class="hero__meta">
        <span class="tag">${movie.rating}</span>
        <span>${movie.year}</span>
        <span>${movie.genre}</span>
      </div>
      <p class="hero__desc">${movie.description}</p>
      <div class="hero__actions">
        <a class="btn btn--play" href="/watch.html?id=${movie.id}">▶ 재생</a>
        <a class="btn btn--info" href="/watch.html?id=${movie.id}">ⓘ 상세 정보</a>
      </div>
    </div>
  `;
}

function cardHtml(movie) {
  return `
    <a class="card" href="/watch.html?id=${movie.id}">
      <img class="card__img" src="${movie.poster}" alt="${movie.title}" loading="lazy" />
      <div class="card__title">${movie.title}</div>
    </a>
  `;
}

function renderRows(catalog) {
  rows.innerHTML = catalog
    .map(
      (cat) => `
      <section class="row">
        <h2 class="row__title">${cat.title}</h2>
        <div class="row__track">${cat.items.map(cardHtml).join('')}</div>
      </section>
    `
    )
    .join('');
}

async function init() {
  try {
    const res = await fetch('/api/home');
    if (!res.ok) throw new Error('네트워크 오류');
    const { featured, catalog } = await res.json();
    renderHero(featured);
    renderRows(catalog);
  } catch (err) {
    rows.innerHTML = `<p class="loading">콘텐츠를 불러오지 못했습니다: ${err.message}</p>`;
  }
}

init();
