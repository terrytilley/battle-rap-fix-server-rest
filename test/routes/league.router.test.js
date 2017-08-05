import request from 'supertest';
import { expect } from 'chai';
import { rollback, migrate, seed } from '../helper';
import app from '../../app';

describe('/leagues', () => {
  const URL = '/api/v1/leagues';

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
    it('should get all leagues', (done) => {
      request(app)
        .get(`${URL}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('id', 1);
          expect(res.body[0]).to.have.property('userId', 1);
          expect(res.body[0]).to.have.property('name', 'Don\'t Flop Entertainment');
          expect(res.body[0]).to.have.property('nameSlug', 'dont-flop-entertainment');
          expect(res.body[0]).to.have.property('slogan', 'DFAFD');
          expect(res.body[0]).to.have.property('country', 'United Kingdom');
          expect(res.body[0]).to.have.property('active', true);
          done();
        });
    });
  });

  describe('GET /id/:id', () => {
    it('should get a league by id', (done) => {
      request(app)
        .get(`${URL}/id/1`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('userId', 1);
          expect(res.body).to.have.property('name', 'Don\'t Flop Entertainment');
          expect(res.body).to.have.property('nameSlug', 'dont-flop-entertainment');
          expect(res.body).to.have.property('slogan', 'DFAFD');
          expect(res.body).to.have.property('country', 'United Kingdom');
          expect(res.body).to.have.property('active', true);
          done();
        });
    });
  });
});
