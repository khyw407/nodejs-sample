const config = require('./lib/config/prjconfig');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', config.node.port);

app.use(logger('dev'));
app.use(cookieParser(config.cookie.secret));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.cookie.secret,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  const err = new Error('Not fount');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
