var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Handlebars = require('hbs');

// This is a cool way to do environment variables.
//      https://github.com/motdotla/dotenv
//   ** You need to add a   .env   file with the contents that we want to load into the environment variables.
/*
var dotenv = require('dotenv');

if (process.env.hasOwnProperty("db_name")) {
  console.log("Environment variables were passed into the application");
} else {
  console.log("No Environment variables were passed in, checking for .env file! ");
  // Load the ENVIRONMENT variables from the .env file
  dotenv.config();

  if (process.env.hasOwnProperty("db_name") && process.env.hasOwnProperty("db_full_url")) {
    console.log("All required environment variables were loaded");
  } else {
    console.log("Environment Variables db_name & db_full_url are required.");
    console.log("If your running locally, create a .env file in the root directory and use name=value pairs to populate the environment variables.");
  }
}
*/

// Register a new Handlebars HELPER function
//  You can use this in any one of the hbs view's like this. (Will return JSON document in STRING format)
// {{{JSON yourelement}}}
Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});


// These are the Express Routers
var indexRouter = require('./routes/index');
var healthRouter = require('./routes/health');
var howtoRouter = require('./routes/howto');
var pitchRouter = require('./routes/pitch');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// These are the routes.
app.use('/', indexRouter);
app.use('/health', healthRouter);
app.use('/howto', howtoRouter);
app.use('/pitch', pitchRouter);

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