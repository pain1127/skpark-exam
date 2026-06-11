// 상세검색 페이지 로직.
// 1) /api/filters 로 셀렉트/체크박스 옵션 채우기
// 2) 폼 제출 시 조건을 쿼리스트링으로 만들어 /api/search 호출 후 결과 렌더링

const form = document.getElementById('form');
const typesBox = document.getElementById('types');
const genreSel = document.getElementById('genre');
const countrySel = document.getElementById('country');
const yearFromEl = document.getElementById('yearFrom');
const yearToEl = document.getElementById('yearTo');
const resultsHead = document.getElementById('resultsHead');
const resultsGrid = document.getElementById('resultsGrid');

// ---------- 옵션 채우기 ----------
function buildTypeChecks(types) {
  const all = `<label><input type="checkbox" id="type-all" checked /> 전체</label>`;
  const items = types
    .map((t) => `<label><input type="checkbox" class="type-opt" value="${t}" checked /> ${t}</label>`)
    .join('');
  typesBox.innerHTML = all + items;

  const allEl = document.getElementById('type-all');
  const opts = [...document.querySelectorAll('.type-opt')];

  // '전체' 토글 → 개별 전체 동기화
  allEl.addEventListener('change', () => opts.forEach((o) => (o.checked = allEl.checked)));
  // 개별 변경 → '전체' 상태 동기화
  opts.forEach((o) =>
    o.addEventListener('change', () => (allEl.checked = opts.every((x) => x.checked)))
  );
}

function fillSelect(sel, values) {
  values.forEach((v) => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    sel.appendChild(opt);
  });
}

async function loadFilters() {
  const res = await fetch('/api/filters');
  const f = await res.json();
  buildTypeChecks(f.types);
  fillSelect(genreSel, f.genres);
  fillSelect(countrySel, f.countries);
  yearFromEl.placeholder = `${f.years.min}`;
  yearToEl.placeholder = `${f.years.max}`;
}

// ---------- 검색 ----------
function selectedTypes() {
  const allEl = document.getElementById('type-all');
  if (allEl.checked) return null; // 전체
  return [...document.querySelectorAll('.type-opt')].filter((o) => o.checked).map((o) => o.value);
}

function buildQuery() {
  const params = new URLSearchParams();
  const add = (k, v) => v && params.set(k, v);

  const types = selectedTypes();
  if (types && types.length) params.set('types', types.join(','));

  add('title', document.getElementById('title').value.trim());

  // 배우·스탭: 역할 선택에 따라 파라미터명 결정
  const role = document.getElementById('role').value;
  const person = document.getElementById('person').value.trim();
  if (person) {
    const key = role === 'director' ? 'director' : role === 'cast' ? 'cast' : 'person';
    params.set(key, person);
  }

  add('company', document.getElementById('company').value.trim());
  add('keyword', document.getElementById('keyword').value.trim());
  add('genre', genreSel.value);
  add('country', countrySel.value);
  add('yearFrom', yearFromEl.value.trim());
  add('yearTo', yearToEl.value.trim());

  return params;
}

function resultCard(m) {
  const castLine = m.cast.length ? ` · 출연 ${m.cast.join(', ')}` : '';
  return `
    <a class="result-card" href="/watch.html?id=${m.id}">
      <img class="card__img" src="${m.poster}" alt="${m.title}" loading="lazy" />
      <div class="result-card__title">${m.title}</div>
      <div class="result-card__meta">
        ${m.type} · ${m.genre} · ${m.year} · ${m.country}<br />
        감독 ${m.director}${castLine}
      </div>
    </a>
  `;
}

async function runSearch() {
  const params = buildQuery();
  resultsHead.textContent = '검색 중…';
  try {
    const res = await fetch(`/api/search?${params.toString()}`);
    const { total, results } = await res.json();
    resultsHead.textContent = `검색 결과 ${total}건`;
    resultsGrid.innerHTML = total
      ? results.map(resultCard).join('')
      : '<p class="loading">조건에 맞는 작품이 없습니다.</p>';
  } catch (err) {
    resultsHead.textContent = `검색 실패: ${err.message}`;
    resultsGrid.innerHTML = '';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  runSearch();
});

document.getElementById('reset').addEventListener('click', () => {
  form.reset();
  document.getElementById('type-all').checked = true;
  document.querySelectorAll('.type-opt').forEach((o) => (o.checked = true));
  resultsHead.textContent = '조건을 입력하고 검색해 보세요.';
  resultsGrid.innerHTML = '';
});

// 초기화: 옵션 로드 후 전체 목록 한 번 보여주기
loadFilters().then(runSearch);
