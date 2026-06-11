// 시청 페이지: ?id= 로 작품을 받아 플레이어와 정보를 렌더링합니다.

const player = document.getElementById('player');
const info = document.getElementById('info');

function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function render(movie) {
  document.title = `광주정보문화산업진흥원 — ${movie.title}`;
  // Kollus iframe 임베드로 재생
  player.innerHTML = `
    <iframe
      class="player-frame"
      src="${movie.embed}"
      frameborder="0"
      allow="local-network-access; autoplay; fullscreen"
      allowfullscreen
      webkitallowfullscreen
      mozallowfullscreen
    ></iframe>
  `;
  info.innerHTML = `
    <h1 class="watch__title">${movie.title}</h1>
    <div class="watch__meta">
      <span>${movie.rating}</span>
      <span>${movie.year}</span>
      <span>${movie.genre}</span>
    </div>
    <p class="watch__desc">${movie.description}</p>
  `;
}

async function init() {
  const id = getId();
  if (!id) {
    info.innerHTML = '<p class="loading">잘못된 접근입니다. 작품 ID가 없습니다.</p>';
    return;
  }
  try {
    const res = await fetch(`/api/movies/${id}`);
    if (res.status === 404) throw new Error('작품을 찾을 수 없습니다.');
    if (!res.ok) throw new Error('네트워크 오류');
    render(await res.json());
  } catch (err) {
    info.innerHTML = `<p class="loading">${err.message}</p>`;
  }
}

init();
