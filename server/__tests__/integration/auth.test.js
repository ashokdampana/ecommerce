
const app = require('../../app');
const request = require('supertest');

const registerUser = {"name": "Alice Johnson",
    "email": "alice@example.com", "password": "hashedpassword123"
}


test('POST /api/auth/register', async () => { 
  const res = await request(app).post('/api/auth/register').send(registerUser)

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("message");
  expect(res.body.message).toBe("User registered successfully");
});


test('POST /api/auth/login', async () => { 
  const res = await request(app).post('/api/auth/login').send(registerUser)

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("message");
  expect(res.body.message).toBe("User Login Successfully");
  expect(res.body.token).toBe();
});
