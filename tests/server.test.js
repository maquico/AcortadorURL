const request = require('supertest');
const app = require('../src/server');

let server;
let shortUrl;
const fullUrl = 'https://youtube.com'; // Replace with the full URL you want to test

beforeAll(async () => {
  server = await app.listen(3000);
});

afterAll(async () => {
  await server.close();
});

describe('Link Shortener', () => {
  describe('POST /shorten', () => {
    it('should generate a short URL', async () => {
      // Insert the URL and generate a short URL
      const response = await request(app)
        .post('/shorten')
        .send({ fullUrl });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('shortUrl');
      shortUrl = response.body.shortUrl;
    });
  });
});
