import request from 'supertest';
import { expect } from 'chai';
import { rollback, migrate, seed } from '../helper';
import app from '../../app';

describe('/events', () => {
  const URL = '/api/v1/leagues';

  beforeEach((done) => {
    rollback()
      .then(() => migrate())
      .then(() => seed())
      .then(() => done());
  });

  describe('GET /', () => {
    it('should get all events of league', (done) => {
      request(app)
        .get(`${URL}/dont-flop-entertainment/events`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('id', 1);
          expect(res.body[0]).to.have.property('leagueId', 1);
          expect(res.body[0]).to.have.property('name', 'REVIVAL 9INE');
          expect(res.body[0]).to.have.property('nameSlug', 'revival-9ine');
          expect(res.body[0]).to.have.property('venue', 'Venue Nightclub');
          expect(res.body[0]).to.have.property('location', '29 Jackson Row Venue Nightclub Manchester');
          expect(res.body[0]).to.have.property('date');
          done();
        });
    });

    it('should return error if no events', (done) => {
      request(app)
        .get(`${URL}/king-of-the-ronalds/events`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'No Events Found');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('GET /:event_slug', () => {
    it('should get event by slug', (done) => {
      request(app)
        .get(`${URL}/dont-flop-entertainment/events/revival-9ine`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('leagueId', 1);
          expect(res.body).to.have.property('name', 'REVIVAL 9INE');
          expect(res.body).to.have.property('nameSlug', 'revival-9ine');
          expect(res.body).to.have.property('venue', 'Venue Nightclub');
          expect(res.body).to.have.property('location', '29 Jackson Row Venue Nightclub Manchester');
          expect(res.body).to.have.property('date');
          done();
        });
    });

    it('should return error if no events', (done) => {
      request(app)
        .get(`${URL}/dont-flop-entertainment/events/idontexist`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'No Event Found');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
