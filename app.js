import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import validator from 'express-validator';
import { Model } from 'objection';
import knex from './db/knex';
import routes from './routes/index.router';

require('dotenv').config();
global.Promise = require('bluebird');

const app = express();

Model.knex(knex);

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(cors());
app.use(validator());
app.use('/api/v1', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {},
    });
    next(err);
  });
}

export default app;
