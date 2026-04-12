const app = require('../../app');
const request = require('supertest');

test('GET /', async () => { 
  const res = await request(app).get('/');

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ message: "server home page" });
});
