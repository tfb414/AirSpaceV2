var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const queries = require('./queries');
const session = require('express-session');
require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/************************************************************* GOOGLE OAUTH *************/
passport.serializeUser(function(email, done) {
    // saves user's email under req.session.passport.user
    done(null, email);
});

passport.deserializeUser(function(email, done) {
  // could get entire profile during deserialization, right now just returning email
    // db.one(`select * from users where email = '${email}'`)
    //     .then((result) => {
    //         done(null, result);
    //     })
    done(null, email);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
    function(accessToken, refreshToken, profile, done) {
        var firstname = profile.name.givenName;
        firstname = firstname.replace("'", "''");
        var lastname = profile.name.familyName;
        lastname = lastname.replace("'", "''");
        queries.addOrUpdateHost(profile.emails[0].value, firstname, lastname)
        .then((result) => {
            done(null, profile.emails[0].value);
        })
}))
    

// Express and Passport Session
app.use(session({
    secret: 'asdfjkl;',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/host',
        failureRedirect: '/',
        failureFlash: true }));
        
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
