import request from 'supertest';
import { expect } from 'chai';
import { rollback, migrate, seed } from '../helper';
import app from '../../app';

describe('/artists', () => {
  const URL = '/api/v1/artists';

  beforeEach((done) => {
    rollback()
      .then(() => migrate())
      .then(() => seed())
      .then(() => done());
  });

  describe('GET /', () => {
    it('should get all artists', (done) => {
      request(app)
        .get(`${URL}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('id', 1);
          expect(res.body[0]).to.have.property('realName', 'Adam Rooney');
          expect(res.body[0]).to.have.property('stageName', 'Shotty Horroh');
          expect(res.body[0]).to.have.property('slug', 'shotty-horroh');
          expect(res.body[0]).to.have.property('dob');
          expect(res.body[0]).to.have.property('based', 'Manchester');
          expect(res.body[0]).to.have.property('country', 'United Kingdom');
          done();
        });
    });

    describe('No Artists', () => {
      beforeEach((done) => {
        rollback()
          .then(() => migrate())
          .then(() => done());
      });

      it('should return error if no artists', (done) => {
        request(app)
        .get(`${URL}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'No Artists Found');
          expect(res.body).to.have.property('error');
          done();
        });
      });
    });
  });

  describe('GET /:artist_slug', () => {
    it('should get artist by slug', (done) => {
      request(app)
        .get(`${URL}/shotty-horroh`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('realName', 'Adam Rooney');
          expect(res.body).to.have.property('stageName', 'Shotty Horroh');
          expect(res.body).to.have.property('slug', 'shotty-horroh');
          expect(res.body).to.have.property('dob');
          expect(res.body).to.have.property('based', 'Manchester');
          expect(res.body).to.have.property('country', 'United Kingdom');
          expect(res.body).to.have.property('bio');
          done();
        });
    });

    it('should return error if no artists', (done) => {
      request(app)
        .get(`${URL}/idontexist`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Artist Not Found');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
