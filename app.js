var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// error logger
const fs = require('fs');
const util = require('util');
var log_file_err = fs.createWriteStream(__dirname + '/error.log', {
  flags: 'a'
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  log_file_err.write(util.format('Caught exception: ' + err) + '\n');
});

// enables process.env['KEY']
// create .env with authorizations:
// USERNAME, PASSWORD, DB_USER, DB_PASSWORD, EMAIL_PASS
const dotenv = require('dotenv').config();

var indexRouter = require('./routes/index');
const bikesRouter = require('./routes/bikes');
const rentalsRouter = require('./routes/rentals');
const badPositionRouter = require('./routes/bad-position');

// running scheduled tasks and cron jobs
const schedule = require('./schedule');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bikes', bikesRouter);
app.use('/rentals', rentalsRouter);
app.use('/bad-position', badPositionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
