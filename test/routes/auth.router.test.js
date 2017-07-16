import request from 'supertest';
import { rollback, migrate, seed } from '../helper';
import app from '../../app';

describe('/auth', () => {
  const URL = '/api/v1';

  beforeEach((done) => {
    rollback()
      .then(() => migrate())
      .then(() => seed())
      .then(() => done());
  });

  afterEach((done) => {
    rollback().then(() => done());
  });

  describe('POST /register', () => {
    it('should create a new user', () => (
      request(app)
      .post(`${URL}/auth/register`)
      .send({
        displayName: 'John Smith',
        username: 'johnsmith123',
        email: 'john@johnsmith.com',
        password: 'qwerty123',
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('id', 5);
        expect(res.body.user).toHaveProperty('displayName', 'John Smith');
        expect(res.body.user).toHaveProperty('username', 'johnsmith123');
        expect(res.body.user).toHaveProperty('email', 'john@johnsmith.com');
        expect(res.body.user).not.toHaveProperty('password', 'qwerty123');
      })
    ));

    it('should NOT create a new user if email taken', () => (
      request(app)
      .post(`${URL}/auth/register`)
      .send({
        displayName: 'Terry Tilley',
        username: 'terryt888',
        email: 'terry@terrytilley.com', // Taken email
        password: 'qwerty123',
      })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
      })
    ));

    it('should NOT create a new user if username taken', () => (
      request(app)
      .post(`${URL}/auth/register`)
      .send({
        displayName: 'Terry Tilley',
        username: 'terryt88', // Taken username
        email: 'terrence@terrytilley.com',
        password: 'qwerty123',
      })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
      })
    ));
  });
});
