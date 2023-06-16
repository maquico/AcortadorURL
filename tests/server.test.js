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
  it('should run the server without errors', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
