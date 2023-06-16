const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  server = await app.listen(3000);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Link Shortener', () => {
  describe('POST /shorten', () => {
    it('should generate a short URL', async () => {
      const fullUrl = 'https://www.youtube.com/';
      const response = await request(app)
        .post('/shorten')
        .send({ fullUrl });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('shortUrl');
    });
  });
});

