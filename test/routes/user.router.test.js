import request from 'supertest';
import { expect } from 'chai';
import { rollback, migrate, seed } from '../helper';
import app from '../../app';

describe('/users', () => {
  const URL = '/api/v1/users';

  beforeEach((done) => {
    rollback()
      .then(() => migrate())
      .then(() => seed())
      .then(() => done());
  });

  afterEach((done) => {
    rollback().then(() => done());
  });

  describe('GET /', () => {
    it('should get all users', (done) => {
      request(app)
        .get(`${URL}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(4);
          expect(res.body[0]).to.have.property('id', 1);
          expect(res.body[0]).to.have.property('displayName', 'Terry Tilley');
          expect(res.body[0]).to.have.property('username', 'terryt88');
          expect(res.body[0]).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body[0]).to.not.have.property('password', 'qwerty123');
          done();
        });
    });
  });

  describe('GET /id/:id', () => {
    it('should get a user by id', (done) => {
      request(app)
        .get(`${URL}/id/1`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('displayName', 'Terry Tilley');
          expect(res.body).to.have.property('username', 'terryt88');
          expect(res.body).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body).to.not.have.property('password', 'qwerty123');
          done();
        });
    });
  });

  describe('GET /:username', () => {
    it('should get a user by username', (done) => {
      request(app)
        .get(`${URL}/terryt88`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('displayName', 'Terry Tilley');
          expect(res.body).to.have.property('username', 'terryt88');
          expect(res.body).to.have.property('email', 'terry@terrytilley.com');
          expect(res.body).to.not.have.property('password', 'qwerty123');
          done();
        });
    });
  });
});
