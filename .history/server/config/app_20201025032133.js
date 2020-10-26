/*App.js created by Carlos Cruz-Claro 0N 2020-10-11
#300-902-439 */

// Installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Modules for auth 
let session = require('express-session');
let passport = require('passport');

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Database setup
let mongoose = require('mongoose')
let DB = require('./db')

// Point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:' )); //Bind error to console and give us a error incase of MongoDB failure
mongoDB.once('open', ()=>{ //Only post to console once if we connect to MongoDB
  console.log('Connected to MongoDB...');
});
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
//let businessRouter = require('../routes/customers');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); //express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//Setup express session 
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Initialize flash 
app.use(flash());

//Initalize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport user config

//Create a guest model instance 
let guestUserModel = require('../models/guestUserModel');
let User = guestUserModel.User;

// implement a User Authentication Strategy
//passport.use(User.createStrategy());

//Serialize and deserialize (encrpyt and decrypt) guest infro 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport.use(strategy);
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/customers', businessRouter)

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
  res.render('error', { title: 'Error'});
});

module.exports = app;
