const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Media API',
      version: '1.0.0',
      description: '미디어 CRUD API 문서',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
  },
  // 라우트 파일의 JSDoc 주석을 스캔
  apis: [path.join(__dirname, 'routes', '*.js')],
};

module.exports = swaggerJsdoc(options);
