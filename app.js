import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(cors());

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development Error Handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  });
}

// Production Error Handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

export default app;
