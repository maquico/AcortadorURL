const request = require('supertest');
const app = require('../src/server');

let server;
const fixedShortUrl = 'abcd'; // Replace with a fixed short URL
const expectedFullUrl = 'https://www.youtube.com/'; // Replace with the expected full URL

beforeAll(async () => {
  server = await app.listen(3000);
});

afterAll(async () => {
  await server.close();
});

describe('Link Shortener', () => {
  describe('GET /:shortUrl', () => {
    it('should redirect to the full URL', async () => {
      const response = await request(app).get(`/${fixedShortUrl}`);

      expect(response.status).toBe(404);
      expect(response.header['location']).toBe(expectedFullUrl);
    }, 10000); // Set a timeout of 10 seconds (adjust as needed)
  });
});
