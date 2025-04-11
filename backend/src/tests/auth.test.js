
import request from 'supertest';
import {app} from '../app.js'; 
describe("Auth API", () => {
  test("Register user", async () => {
    const res = await request(app).post("/api/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
  });
});
