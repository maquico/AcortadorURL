const request = require('supertest');
const app = require('../src/server');

let server;

beforeAll(async () => {
  server = await app.listen(3000);
});

afterAll(async () => {
  await server.close();
});

describe('Link Shortener', () => {
  describe('GET /:shortUrl', () => {
    it('should redirect to the full URL', async () => {
      const response = await request(app).get('/existing-short-url');

      expect(response.status).toBe(302);
      expect(response.header['location']).toBe('https://example.com'); // Replace with the expected full URL
    });
  });
});
