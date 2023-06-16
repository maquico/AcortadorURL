const request = require('supertest');
const app = require('../src/server');

let server;
let shortUrl;

beforeAll(async () => {
  server = await app.listen(3000);
}, 10000);

afterAll(async () => {
  await server.close();
});

describe('Link Shortener', () => {
  describe('GET /:shortUrl', () => {
    beforeAll(async () => {
      // Perform the necessary steps to generate the short URL and store it in the `shortUrl` variable
      const inputUrl = 'https://youtube.com'; // Replace with your desired input URL
      const response = await request(app).post('/shortUrls').send({ fullUrl: inputUrl });
      shortUrl = response.body.shortUrl; // Assuming the generated short URL is returned in the response body
    });

    it('should redirect to the full URL', async () => {
      const response = await request(app).get(`/${shortUrl}`);

      expect(response.status).toBe(302);
      expect(response.header['location']).toBe('https://youtube.com'); // Replace with the expected full URL
    });
  });
});
