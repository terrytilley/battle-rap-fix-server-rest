import request from 'supertest';
import { rollback, migrate } from '../helper';
import app from '../../app';

describe('/auth', () => {
  const URL = '/api/v1';

  beforeEach((done) => {
    rollback()
      .then(() => migrate())
      .then(() => done());
  });

  afterEach((done) => {
    rollback().then(() => done());
  });

  describe('POST /register', () => {
    it('should register a user', () => (
      request(app)
      .post(`${URL}/auth/register`)
      .send({
        displayName: 'Terry Tilley',
        username: 'terryt88',
        email: 'terry@terrytilley.com',
        password: 'qwerty123',
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('id', 1);
        expect(res.body.user).toHaveProperty('displayName', 'Terry Tilley');
        expect(res.body.user).toHaveProperty('username', 'terryt88');
        expect(res.body.user).toHaveProperty('email', 'terry@terrytilley.com');
        expect(res.body.user).not.toHaveProperty('password', 'qwerty123');
      })
    ));
  });
});
