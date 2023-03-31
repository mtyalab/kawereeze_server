require("express-async-errors");
require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connection = require("./db/db");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const indexRouter = require('./routes/index.route');
const usersRouter = require('./routes/users.route');
const transactionRouter = require('./routes/transactions.route');

const app = express();


(async function db() {
  await connection();
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const corsOptions = {
  origin: [],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v0', usersRouter);
app.use('/v0', transactionRouter);


app.get('/favicon.ico', (req, res) => res.status(204).end());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError('🥴'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  next(createError('🥴'));
});

module.exports = app;
