import request from 'supertest';
import { expect } from 'chai';
import { rollback, migrate, seed } from '../helper';
import app from '../../app';

describe('/auth', () => {
  const URL = '/api/v1/auth';

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
    it('should create a new user', (done) => {
      request(app)
        .post(`${URL}/register`)
        .send({
          displayName: 'John Smith',
          username: 'johnsmith123',
          email: 'john@johnsmith.com',
          password: 'qwerty123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id', 5);
          expect(res.body.user).to.have.property('displayName', 'John Smith');
          expect(res.body.user).to.have.property('username', 'johnsmith123');
          expect(res.body.user).to.have.property('email', 'john@johnsmith.com');
          expect(res.body.user).to.not.have.property('password', 'qwerty123');
          done();
        });
    });

    it('should NOT create a new user if email taken', (done) => {
      request(app)
        .post(`${URL}/register`)
        .send({
          displayName: 'Terry Tilley',
          username: 'terryt888',
          email: 'terry@terrytilley.com', // Taken email
          password: 'qwerty123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should NOT create a new user if username taken', (done) => {
      request(app)
        .post(`${URL}/register`)
        .send({
          displayName: 'Terry Tilley',
          username: 'terryt88', // Taken username
          email: 'terrence@terrytilley.com',
          password: 'qwerty123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should allow a user to login with email', (done) => {
      request(app)
        .post(`${URL}/login`)
        .send({
          emailOrUsername: 'terry@terrytilley.com',
          password: 'qwerty123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id', 1);
          expect(res.body.user).to.have.property('displayName', 'Terry Tilley');
          expect(res.body.user).to.have.property('username', 'terryt88');
          expect(res.body.user).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body.user).to.not.have.property('password', 'qwerty123');
          done();
        });
    });

    it('should allow a user to login with username', (done) => {
      request(app)
        .post(`${URL}/login`)
        .send({
          emailOrUsername: 'terryt88',
          password: 'qwerty123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id', 1);
          expect(res.body.user).to.have.property('displayName', 'Terry Tilley');
          expect(res.body.user).to.have.property('username', 'terryt88');
          expect(res.body.user).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body.user).to.not.have.property('password', 'qwerty123');
          done();
        });
    });

    it('should not allow user to login with wrong username', (done) => {
      request(app)
        .post(`${URL}/login`)
        .send({
          emailOrUsername: 'terryt8',
          password: 'qwerty123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should not allow user to login with wrong password', (done) => {
      request(app)
        .post(`${URL}/login`)
        .send({
          emailOrUsername: 'terryt88',
          password: 'qwerty123456',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('PATCH /forgot-password', () => {
    xit('should allow user to request reset password email', (done) => {
      request(app)
        .patch(`${URL}/forgot-password`)
        .send({
          email: 'terry@terrytilley.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.accepted[0]).to.have.property('status', 'sent');
          expect(res.body.accepted[0]).to.have.property('email', 'terry@terrytilley.com');
          done();
        });
    });

    it('should return error if email not found', (done) => {
      request(app)
        .patch(`${URL}/forgot-password`)
        .send({
          email: 'terrence@terrytilley.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error', 'terrence@terrytilley.com does not exist');
          done();
        });
    });
  });

  describe('PATCH /reset-password/:token', () => {
    it('should successfully change password', (done) => {
      request(app)
        .patch(`${URL}/reset-password/94c6bc9837ad6bd972ac1d991a370e39754d45c25cdbf6b0db1b231ce1b3ba40230717e31d34b45047b26960f3ff14fc`)
        .send({
          password: 'qwerty123456',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message', 'Password successfully changed.');
          done();
        });
    });

    it('should NOT change password if token has expired', (done) => {
      request(app)
        .patch(`${URL}/reset-password/94c6bc9837ad6bd972ac1d991a370e39754d45c25cdbf6b0db1b231ce1b3ba40230717e31d34b45047b26960f3ff14fd`)
        .send({
          password: 'qwerty123456',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error', 'Token has expired');
          done();
        });
    });
  });
});
