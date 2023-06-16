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
  await mongoose.disconnect();
  await server.close();
});

describe('Link Shortener', () => {
  it('should run the server without errors', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

