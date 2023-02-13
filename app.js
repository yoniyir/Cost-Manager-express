// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Define the routes of the project
var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var aboutRouter = require('./routes/about');
var reportRouter = require('./routes/report');
var addcostRouter = require('./routes/addcost');
var initRouter = require('./routes/init');

var app = express();
const connectDb = require('./db/conn');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/about', aboutRouter);
app.use('/report', reportRouter);
app.use('/addcost', addcostRouter);
app.use('/init', initRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Connect to the DB and start the server - Running once
connectDb().then(() => {
  console.log('DB connected --> now in app.js');
});

module.exports = app;
