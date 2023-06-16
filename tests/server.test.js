
const request = require('supertest');
const app = require('../src/server');

beforeAll(async () => {
  await app.listen(5000);
});

afterAll(async () => {
  await app.close();
});

describe('Link Shortener', () => {
  describe('POST /shortUrls', () => {
    it('should create a new short URL', async () => {
      const response = await request(app)
        .post('/shortUrls')
        .send({ fullUrl: 'https://example.com' });

      expect(response.status).toBe(302); // assuming you expect a redirect response
      // additional assertions if needed
    });
  });

  describe('GET /:shortUrl', () => {
    it('should redirect to the full URL', async () => {
      const response = await request(app).get('/abcd'); // replace "abcd" with an existing short URL in your database

      expect(response.status).toBe(302); // assuming you expect a redirect response
      expect(response.header['location']).toBe('https://example.com'); // replace with the expected full URL
      // additional assertions if needed
    });

    it('should return 404 for non-existing short URL', async () => {
      const response = await request(app).get('/nonexistent');

      expect(response.status).toBe(404);
      // additional assertions if needed
    });
  });
});
