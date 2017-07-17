import request from 'supertest';
import { expect } from 'chai';
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
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        expect(res.body.user).to.have.property('id', 5);
        expect(res.body.user).to.have.property('displayName', 'John Smith');
        expect(res.body.user).to.have.property('username', 'johnsmith123');
        expect(res.body.user).to.have.property('email', 'john@johnsmith.com');
        expect(res.body.user).to.not.have.property('password', 'qwerty123');
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
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property('error');
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
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property('error');
      })
    ));
  });

  describe('POST /login', () => {
    it('should allow a user to login with email', () => {
      request(app)
        .post(`${URL}/auth/login`)
        .send({
          emailOrUsername: 'terry@terrytilley.com',
          password: 'qwerty123',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id', 1);
          expect(res.body.user).to.have.property('displayName', 'Terry Tilley');
          expect(res.body.user).to.have.property('username', 'terryt88');
          expect(res.body.user).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body.user).to.not.have.property('password', 'qwerty123');
        });
    });

    it('should allow a user to login with username', () => {
      request(app)
        .post(`${URL}/auth/login`)
        .send({
          emailOrUsername: 'terryt88',
          password: 'qwerty123',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id', 1);
          expect(res.body.user).to.have.property('displayName', 'Terry Tilley');
          expect(res.body.user).to.have.property('username', 'terryt88');
          expect(res.body.user).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body.user).to.not.have.property('password', 'qwerty123');
        });
    });

    it('should not allow user to login with wrong username', () => {
      request(app)
        .post(`${URL}/auth/login`)
        .send({
          emailOrUsername: 'terryt8',
          password: 'qwerty123',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(401);
        });
    });

    it('should not allow user to login with wrong password', () => {
      request(app)
        .post(`${URL}/auth/login`)
        .send({
          emailOrUsername: 'terryt88',
          password: 'qwerty123456',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(401);
        });
    });
  });

  describe('PATCH /forgot-password', () => {
    xit('should allow user to request reset password email', () => {
      request(app)
        .patch(`${URL}/auth/forgot-password`)
        .send({
          email: 'terry@terrytilley.com',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.accepted[0]).to.have.property('status', 'sent');
          expect(res.body.accepted[0]).to.have.property('email', 'terry@terrytilley.com');
        });
    });

    it('should return error if email not found', () => {
      request(app)
        .patch(`${URL}/auth/forgot-password`)
        .send({
          email: 'terrence@terrytilley.com',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error', 'terrence@terrytilley.com does not exist');
        });
    });
  });

  describe('PATCH /reset-password/:token', () => {
    it('should successfully change password', () => {
      request(app)
        .patch(`${URL}/auth/reset-password/94c6bc9837ad6bd972ac1d991a370e39754d45c25cdbf6b0db1b231ce1b3ba40230717e31d34b45047b26960f3ff14fc`)
        .send({
          password: 'qwerty123456',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message', 'Password successfully changed.');
        });
    });

    it('should NOT change password if token has expired', () => {
      request(app)
        .patch(`${URL}/auth/reset-password/94c6bc9837ad6bd972ac1d991a370e39754d45c25cdbf6b0db1b231ce1b3ba40230717e31d34b45047b26960f3ff14fd`)
        .send({
          password: 'qwerty123456',
        })
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error', 'Token has expired');
        });
    });
  });
});
