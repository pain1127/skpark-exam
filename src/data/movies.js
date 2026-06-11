// 데모용 샘플 카탈로그 (영상 아카이브 스타일 메타데이터).
// 실제 서비스에서는 이 부분을 DB 조회나 외부 CMS 연동으로 교체하면 됩니다.
//
// poster/backdrop 이미지는 picsum.photos(시드 고정)로 안정적인 더미 이미지를 사용합니다.
// 재생은 Kollus 플랫폼의 iframe 임베드를 사용합니다 (데모에서는 코드 하나를 공통 적용).

const KOLLUS_EMBED = 'https://v.kr.kollus.com/TbZztA5C?';

// 유형(검색 화면의 '유형' 체크박스와 동일)
const TYPES = ['극영화', '애니메이션', '다큐멘터리/기록물', '기타'];

function poster(seed) {
  return `https://picsum.photos/seed/${seed}/480/270`; // 가로형(16:9) 썸네일
}
function backdrop(seed) {
  return `https://picsum.photos/seed/${seed}/1280/720`;
}

// 홈 화면 카테고리(행) 제목
const CATEGORY_TITLES = {
  trending: '지금 뜨는 콘텐츠',
  action: '심장 쫄깃 액션',
  drama: '감동 가득 드라마',
  comedy: '오늘은 가볍게, 코미디',
};

// 작품 원본 정의 (메타데이터 포함)
const SOURCE = [
  // --- 지금 뜨는 콘텐츠 ---
  { category: 'trending', title: '별빛 너머의 도시', type: '극영화', genre: 'SF', year: 2024, country: '한국', rating: '15세', runtime: 124, director: '김도현', cast: ['이서연', '박지훈'], company: '스튜디오 빛', keywords: ['우주', '미래도시', '모험'] },
  { category: 'trending', title: '마지막 추격', type: '극영화', genre: '액션', year: 2023, country: '한국', rating: '청불', runtime: 118, director: '정우성', cast: ['한석규', '김민정'], company: '레드필름', keywords: ['형사', '추격', '범죄조직'] },
  { category: 'trending', title: '서울의 밤', type: '극영화', genre: '스릴러', year: 2024, country: '한국', rating: '15세', runtime: 109, director: '봉준서', cast: ['조진웅', '천우희'], company: '나이트웍스', keywords: ['도심', '미스터리', '하룻밤'] },
  { category: 'trending', title: '기록되지 않은 사람들', type: '다큐멘터리/기록물', genre: '다큐멘터리', year: 2022, country: '한국', rating: '전체', runtime: 96, director: '오민정', cast: [], company: '광주독립영화협회', keywords: ['지역사', '구술', '아카이브'] },
  { category: 'trending', title: '코드네임: 팬텀', type: '극영화', genre: '액션', year: 2024, country: '미국', rating: '15세', runtime: 131, director: 'J. 카터', cast: ['에밀리 스톤', '마크 리'], company: 'Orion Pictures', keywords: ['첩보', '잠입', '음모'] },
  { category: 'trending', title: '구름빵 대모험', type: '애니메이션', genre: '애니메이션', year: 2023, country: '한국', rating: '전체', runtime: 78, director: '한지원', cast: [], company: '툰스튜디오', keywords: ['가족', '판타지', '모험'] },

  // --- 심장 쫄깃 액션 ---
  { category: 'action', title: '강철 도시', type: '극영화', genre: '액션', year: 2021, country: '한국', rating: '15세', runtime: 122, director: '류승완', cast: ['마동석', '김옥빈'], company: '외유내강', keywords: ['느와르', '주먹', '복수'] },
  { category: 'action', title: '폭풍 속으로', type: '극영화', genre: '액션', year: 2023, country: '한국', rating: '15세', runtime: 114, director: '이정호', cast: ['하정우', '전도연'], company: '퍼펙트스톰', keywords: ['재난', '구조', '생존'] },
  { category: 'action', title: '제로 아워', type: '극영화', genre: '스릴러', year: 2024, country: '일본', rating: '청불', runtime: 127, director: '와타나베 켄', cast: ['타카하시 잇세이'], company: 'Toho', keywords: ['타임어택', '인질', '폭탄'] },
  { category: 'action', title: '라스트 가드', type: '극영화', genre: '액션', year: 2022, country: '한국', rating: '15세', runtime: 116, director: '김성훈', cast: ['이병헌', '김태리'], company: '키퍼스', keywords: ['경호', '음모', '배신'] },
  { category: 'action', title: '검은 사막', type: '극영화', genre: '어드벤처', year: 2023, country: '미국', rating: '12세', runtime: 138, director: 'A. 모건', cast: ['크리스 파인'], company: 'Desert Films', keywords: ['사막', '보물', '탐험'] },
  { category: 'action', title: '추격자들', type: '극영화', genre: '범죄', year: 2024, country: '한국', rating: '청불', runtime: 121, director: '나홍진', cast: ['김윤석', '하정우'], company: '쇼박스', keywords: ['연쇄', '추적', '심리전'] },

  // --- 감동 가득 드라마 ---
  { category: 'drama', title: '봄날의 약속', type: '극영화', genre: '드라마', year: 2022, country: '한국', rating: '전체', runtime: 105, director: '이창동', cast: ['윤여정', '박해일'], company: '파인하우스', keywords: ['가족', '치유', '계절'] },
  { category: 'drama', title: '오늘도, 너에게', type: '극영화', genre: '로맨스', year: 2023, country: '한국', rating: '12세', runtime: 112, director: '허진호', cast: ['수지', '남주혁'], company: '무비스프링', keywords: ['첫사랑', '재회', '편지'] },
  { category: 'drama', title: '아버지의 정원', type: '다큐멘터리/기록물', genre: '다큐멘터리', year: 2021, country: '한국', rating: '전체', runtime: 88, director: '김보라', cast: [], company: '시네21', keywords: ['가족', '농촌', '세대'] },
  { category: 'drama', title: '편지가 도착했습니다', type: '극영화', genre: '드라마', year: 2024, country: '프랑스', rating: '12세', runtime: 119, director: 'C. 르블랑', cast: ['소피 마르소'], company: 'Pathé', keywords: ['편지', '기억', '재회'] },
  { category: 'drama', title: '작은 빛', type: '극영화', genre: '드라마', year: 2023, country: '한국', rating: '전체', runtime: 99, director: '윤가은', cast: ['김향기'], company: '아토', keywords: ['성장', '학교', '우정'] },
  { category: 'drama', title: '먼 길', type: '극영화', genre: '드라마', year: 2022, country: '한국', rating: '12세', runtime: 107, director: '임순례', cast: ['문소리', '설경구'], company: '명필름', keywords: ['로드무비', '화해', '여정'] },

  // --- 오늘은 가볍게, 코미디 ---
  { category: 'comedy', title: '주말의 사장님', type: '극영화', genre: '코미디', year: 2024, country: '한국', rating: '전체', runtime: 101, director: '김용화', cast: ['류승룡', '진선규'], company: '덱스터', keywords: ['창업', '소동', '직장'] },
  { category: 'comedy', title: '하이텐션 하우스', type: '극영화', genre: '코미디', year: 2023, country: '한국', rating: '12세', runtime: 96, director: '이병헌', cast: ['이하늬', '안재홍'], company: '하이그라운드', keywords: ['셰어하우스', '청춘', '소동'] },
  { category: 'comedy', title: '내 친구의 결혼식', type: '극영화', genre: '로맨틱코미디', year: 2022, country: '미국', rating: '12세', runtime: 110, director: 'R. 그린', cast: ['안나 켄드릭'], company: 'Universal', keywords: ['결혼', '우정', '삼각관계'] },
  { category: 'comedy', title: '엉뚱한 하루', type: '애니메이션', genre: '애니메이션', year: 2021, country: '일본', rating: '전체', runtime: 84, director: '미야자키 고로', cast: [], company: 'Studio Ponoc', keywords: ['일상', '판타지', '모험'] },
  { category: 'comedy', title: '슈퍼 루키', type: '극영화', genre: '코미디', year: 2023, country: '한국', rating: '전체', runtime: 103, director: '강형철', cast: ['박정민', '최우식'], company: '쇼박스', keywords: ['스포츠', '신인', '성장'] },
  { category: 'comedy', title: '엉망진창 영화제', type: '기타', genre: '실험', year: 2024, country: '한국', rating: '12세', runtime: 67, director: '광주미디어랩', cast: [], company: '광주정보문화산업진흥원', keywords: ['옴니버스', '실험', '지역영화'] },
];

// id/이미지/임베드/설명을 채워 최종 작품 목록 생성
const movies = SOURCE.map((m, i) => {
  const id = i + 1;
  const seed = `${m.category}-${i}`;
  const castText = m.cast.length ? ` 출연 ${m.cast.join(', ')}.` : '';
  return {
    id,
    ...m,
    description:
      `${m.year}년 ${m.country} 제작 ${m.genre} ${m.type}. 감독 ${m.director}.${castText} ` +
      `키워드: ${m.keywords.join(', ')}. (데모용 샘플 설명입니다.)`,
    poster: poster(seed),
    backdrop: backdrop(seed),
    embed: KOLLUS_EMBED, // 작품별 고유 Kollus 코드로 교체 가능
  };
});

// 홈 화면용 카테고리(행) 구성
const catalog = Object.keys(CATEGORY_TITLES).map((cat) => ({
  id: cat,
  title: CATEGORY_TITLES[cat],
  items: movies.filter((m) => m.category === cat),
}));

// 히어로 배너 대표 작품
const featured = movies[0];

// 검색 화면의 셀렉트박스 채우기용 (중복 제거 + 정렬)
const uniqSorted = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b, 'ko'));
const filters = {
  types: TYPES,
  genres: uniqSorted(movies.map((m) => m.genre)),
  countries: uniqSorted(movies.map((m) => m.country)),
  years: {
    min: Math.min(...movies.map((m) => m.year)),
    max: Math.max(...movies.map((m) => m.year)),
  },
};

function findById(id) {
  return movies.find((m) => m.id === Number(id));
}

// 상세검색: 전달된 조건(있는 것만) 모두 만족하는 작품 반환
function search(q = {}) {
  const text = (s) => (s || '').toString().trim().toLowerCase();
  const title = text(q.title);
  const person = text(q.person); // 감독·배우·스탭 통합 검색어
  const director = text(q.director); // 감독만
  const cast = text(q.cast); // 배우·스탭만
  const company = text(q.company);
  const keyword = text(q.keyword);
  const genre = text(q.genre);
  const country = text(q.country);
  const yearFrom = q.yearFrom ? Number(q.yearFrom) : null;
  const yearTo = q.yearTo ? Number(q.yearTo) : null;

  // types: 콤마 구분 문자열 또는 배열. 비어있거나 '전체'면 전체 허용.
  let types = q.types;
  if (typeof types === 'string') types = types.split(',').map((t) => t.trim()).filter(Boolean);
  if (!Array.isArray(types) || types.length === 0 || types.includes('전체')) types = null;

  return movies.filter((m) => {
    if (types && !types.includes(m.type)) return false;
    if (title && !m.title.toLowerCase().includes(title)) return false;
    if (person) {
      const people = [m.director, ...m.cast].join(' ').toLowerCase();
      if (!people.includes(person)) return false;
    }
    if (director && !m.director.toLowerCase().includes(director)) return false;
    if (cast && !m.cast.join(' ').toLowerCase().includes(cast)) return false;
    if (company && !m.company.toLowerCase().includes(company)) return false;
    if (keyword) {
      const hay = [m.keywords.join(' '), m.description, m.genre].join(' ').toLowerCase();
      if (!hay.includes(keyword)) return false;
    }
    if (genre && m.genre.toLowerCase() !== genre) return false;
    if (country && m.country.toLowerCase() !== country) return false;
    if (yearFrom && m.year < yearFrom) return false;
    if (yearTo && m.year > yearTo) return false;
    return true;
  });
}

module.exports = { catalog, movies, featured, filters, findById, search };
