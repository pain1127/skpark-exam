// 간단한 인메모리 데이터 스토어 (실제 서비스에서는 DB로 교체)
let media = [];
let nextId = 1;

function findAll() {
  return media;
}

function findById(id) {
  return media.find((m) => m.id === Number(id));
}

function create({ title, type, url, description }) {
  const now = new Date().toISOString();
  const item = {
    id: nextId++,
    title,
    type,
    url,
    description: description ?? '',
    createdAt: now,
    updatedAt: now,
  };
  media.push(item);
  return item;
}

function update(id, { title, type, url, description }) {
  const item = findById(id);
  if (!item) return null;
  if (title !== undefined) item.title = title;
  if (type !== undefined) item.type = type;
  if (url !== undefined) item.url = url;
  if (description !== undefined) item.description = description;
  item.updatedAt = new Date().toISOString();
  return item;
}

function remove(id) {
  const idx = media.findIndex((m) => m.id === Number(id));
  if (idx === -1) return false;
  media.splice(idx, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };
