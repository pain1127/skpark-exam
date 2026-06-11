// 데모용 샘플 카탈로그.
// 실제 서비스에서는 이 부분을 DB 조회나 외부 CDN/CMS 연동으로 교체하면 됩니다.
//
// poster/backdrop 이미지는 picsum.photos(시드 고정)로 안정적인 더미 이미지를 사용합니다.
// video는 공개 샘플 영상(Big Buck Bunny 등)을 사용합니다 — 추후 실제 스트리밍 URL로 교체.

const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
];

function poster(seed) {
  return `https://picsum.photos/seed/${seed}/300/450`;
}
function backdrop(seed) {
  return `https://picsum.photos/seed/${seed}/1280/720`;
}

// 원본 정의: 카테고리별로 작품을 묶어 둡니다.
const CATEGORIES = [
  {
    id: 'trending',
    title: '지금 뜨는 콘텐츠',
    items: [
      { title: '별빛 너머의 도시', genre: 'SF', year: 2024, rating: '15+' },
      { title: '마지막 추격', genre: '액션', year: 2023, rating: '청불' },
      { title: '서울의 밤', genre: '스릴러', year: 2024, rating: '15+' },
      { title: '바다가 들리는 집', genre: '드라마', year: 2022, rating: '12+' },
      { title: '코드네임: 팬텀', genre: '액션', year: 2024, rating: '15+' },
      { title: '웃음의 온도', genre: '코미디', year: 2023, rating: 'ALL' },
    ],
  },
  {
    id: 'action',
    title: '심장 쫄깃 액션',
    items: [
      { title: '강철 도시', genre: '액션', year: 2021, rating: '15+' },
      { title: '폭풍 속으로', genre: '액션', year: 2023, rating: '15+' },
      { title: '제로 아워', genre: '스릴러', year: 2024, rating: '청불' },
      { title: '라스트 가드', genre: '액션', year: 2022, rating: '15+' },
      { title: '검은 사막', genre: '어드벤처', year: 2023, rating: '12+' },
      { title: '추격자들', genre: '범죄', year: 2024, rating: '청불' },
    ],
  },
  {
    id: 'drama',
    title: '감동 가득 드라마',
    items: [
      { title: '봄날의 약속', genre: '드라마', year: 2022, rating: 'ALL' },
      { title: '오늘도, 너에게', genre: '로맨스', year: 2023, rating: '12+' },
      { title: '아버지의 정원', genre: '드라마', year: 2021, rating: 'ALL' },
      { title: '편지가 도착했습니다', genre: '드라마', year: 2024, rating: '12+' },
      { title: '작은 빛', genre: '드라마', year: 2023, rating: 'ALL' },
      { title: '먼 길', genre: '드라마', year: 2022, rating: '12+' },
    ],
  },
  {
    id: 'comedy',
    title: '오늘은 가볍게, 코미디',
    items: [
      { title: '주말의 사장님', genre: '코미디', year: 2024, rating: 'ALL' },
      { title: '하이텐션 하우스', genre: '코미디', year: 2023, rating: '12+' },
      { title: '내 친구의 결혼식', genre: '로맨틱코미디', year: 2022, rating: '12+' },
      { title: '망한 식당', genre: '코미디', year: 2024, rating: 'ALL' },
      { title: '슈퍼 루키', genre: '코미디', year: 2023, rating: 'ALL' },
      { title: '엉뚱한 하루', genre: '코미디', year: 2021, rating: 'ALL' },
    ],
  },
];

// 평탄화하여 id를 부여하고, 이미지/영상/설명을 채웁니다.
const movies = [];
const catalog = CATEGORIES.map((cat) => {
  const items = cat.items.map((m, i) => {
    const id = movies.length + 1;
    const seed = `${cat.id}-${i}`;
    const movie = {
      id,
      title: m.title,
      genre: m.genre,
      year: m.year,
      rating: m.rating,
      description: `${m.year}년 작 ${m.genre}. "${m.title}"은(는) 데모용 샘플 작품 설명입니다. 실제 서비스에서는 작품별 시놉시스가 들어갑니다.`,
      poster: poster(seed),
      backdrop: backdrop(seed),
      video: SAMPLE_VIDEOS[id % SAMPLE_VIDEOS.length],
    };
    movies.push(movie);
    return movie;
  });
  return { id: cat.id, title: cat.title, items };
});

// 히어로 배너에 쓸 대표 작품 (첫 번째 작품)
const featured = movies[0];

function findById(id) {
  return movies.find((m) => m.id === Number(id));
}

module.exports = { catalog, movies, featured, findById };
