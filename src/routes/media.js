const express = require('express');
const store = require('../store/mediaStore');

const router = express.Router();

const ALLOWED_TYPES = ['video', 'audio', 'image'];

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: 샘플 영상
 *         type:
 *           type: string
 *           enum: [video, audio, image]
 *           example: video
 *         url:
 *           type: string
 *           example: https://example.com/sample.mp4
 *         description:
 *           type: string
 *           example: 설명 텍스트
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     MediaInput:
 *       type: object
 *       required: [title, type, url]
 *       properties:
 *         title:
 *           type: string
 *           example: 샘플 영상
 *         type:
 *           type: string
 *           enum: [video, audio, image]
 *           example: video
 *         url:
 *           type: string
 *           example: https://example.com/sample.mp4
 *         description:
 *           type: string
 *           example: 설명 텍스트
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

function validate(body, { partial = false } = {}) {
  const errors = [];
  const { title, type, url } = body;

  if (!partial || title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      errors.push('title은 비어있지 않은 문자열이어야 합니다.');
    }
  }
  if (!partial || type !== undefined) {
    if (!ALLOWED_TYPES.includes(type)) {
      errors.push(`type은 다음 중 하나여야 합니다: ${ALLOWED_TYPES.join(', ')}`);
    }
  }
  if (!partial || url !== undefined) {
    if (typeof url !== 'string' || url.trim() === '') {
      errors.push('url은 비어있지 않은 문자열이어야 합니다.');
    }
  }
  return errors;
}

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: 미디어 CRUD API
 */

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: 미디어 목록 조회
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: 미디어 배열
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 */
router.get('/', (req, res) => {
  res.json(store.findAll());
});

/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: 단일 미디어 조회
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 미디어 단건
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       404:
 *         description: 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res) => {
  const item = store.findById(req.params.id);
  if (!item) return res.status(404).json({ message: '미디어를 찾을 수 없습니다.' });
  res.json(item);
});

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: 미디어 생성
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MediaInput'
 *     responses:
 *       201:
 *         description: 생성된 미디어
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       400:
 *         description: 유효성 검사 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res) => {
  const errors = validate(req.body || {});
  if (errors.length) return res.status(400).json({ message: errors.join(' ') });
  const item = store.create(req.body);
  res.status(201).json(item);
});

/**
 * @swagger
 * /api/media/{id}:
 *   put:
 *     summary: 미디어 수정
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MediaInput'
 *     responses:
 *       200:
 *         description: 수정된 미디어
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       400:
 *         description: 유효성 검사 실패
 *       404:
 *         description: 찾을 수 없음
 */
router.put('/:id', (req, res) => {
  const errors = validate(req.body || {}, { partial: true });
  if (errors.length) return res.status(400).json({ message: errors.join(' ') });
  const item = store.update(req.params.id, req.body || {});
  if (!item) return res.status(404).json({ message: '미디어를 찾을 수 없습니다.' });
  res.json(item);
});

/**
 * @swagger
 * /api/media/{id}:
 *   delete:
 *     summary: 미디어 삭제
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공 (본문 없음)
 *       404:
 *         description: 찾을 수 없음
 */
router.delete('/:id', (req, res) => {
  const ok = store.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: '미디어를 찾을 수 없습니다.' });
  res.status(204).send();
});

module.exports = router;
