const request = require('supertest');
const app = require('../src/server');

describe('Link Shortener', () => {
  describe('GET /:shortUrl', () => {
    it('should redirect to the full URL', async () => {
      const response = await request(app).get('/abcd'); // replace "abcd" with an existing short URL in your database

      expect(response.status).toBe(302); // assuming you expect a redirect response
      expect(response.header['location']).toBe('https://example.com'); // replace with the expected full URL
      // additional assertions if needed
    });
  });
});
