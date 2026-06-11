const express = require('express');
const path = require('path');
const { catalog, featured, filters, findById, search } = require('./data/movies');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 홈 화면용: 히어로 작품 + 카테고리별 목록
app.get('/api/home', (req, res) => {
  res.json({ featured, catalog });
});

// 상세검색 화면의 셀렉트박스/체크박스 옵션
app.get('/api/filters', (req, res) => {
  res.json(filters);
});

// 상세검색: 쿼리스트링 조건으로 필터링
// 예) /api/search?types=극영화,애니메이션&person=봉준서&genre=스릴러&yearFrom=2022
app.get('/api/search', (req, res) => {
  const results = search(req.query);
  res.json({ total: results.length, results });
});

// 단일 작품 상세 (시청 페이지에서 사용)
app.get('/api/movies/:id', (req, res) => {
  const movie = findById(req.params.id);
  if (!movie) return res.status(404).json({ message: '작품을 찾을 수 없습니다.' });
  res.json(movie);
});

app.listen(port, () => {
  console.log(`MovieFlix demo running at http://localhost:${port}`);
});
