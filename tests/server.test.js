const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  server = app.listen(5000, () => {
    console.log('Test server is running on port 5000');
  });
});

afterAll(async () => {
  await mongoose.disconnect();

  // Close the server and handle errors
  await new Promise((resolve) => {
    server.close((err) => {
      if (err) {
        console.error('Error closing the server:', err);
      } else {
        console.log('Server closed successfully');
      }
      resolve();
    });
  });
});

describe('Link Shortener', () => {
  it('should run the server without errors', async () => {
    const response = await request(server).get('/'); // Use the server object returned by app.listen
    expect(response.status).toBe(200);
  });
});
