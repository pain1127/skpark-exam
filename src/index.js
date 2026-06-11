const express = require('express');
const path = require('path');
const { catalog, featured, findById } = require('./data/movies');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 홈 화면용: 히어로 작품 + 카테고리별 목록
app.get('/api/home', (req, res) => {
  res.json({ featured, catalog });
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
