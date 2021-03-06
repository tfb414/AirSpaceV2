var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
// const MemcachedStore = require('connect-memcached')(session);
const sessionmanager = require('./sessionmanager');
const queries = require('./queries');
require('dotenv').config();
const ensureAuthenticated = require('./utils').ensureAuthenticated;
var websocket = require('./websocket');
var query = require('./queries');

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
passport.serializeUser(function (user, done) {
    // saves user's email under req.session.passport.user
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // could get entire profile during deserialization, right now just returning email
            done(null, user);
});


passport.use('host', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_HOST
},
    function (accessToken, refreshToken, profile, done) {
        let firstname = profile.name.givenName;
        firstname = firstname.replace("'", "''");
        let lastname = profile.name.familyName;
        lastname = lastname.replace("'", "''");
        let email = profile.emails[0].value;
        queries.upsertHost(email, firstname, lastname);
        done(null, {email, firstname, lastname});
    }))

passport.use('guest', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_GUEST
},
    function (accessToken, refreshToken, profile, done) {
        let firstname = profile.name.givenName;
        firstname = firstname.replace("'", "''");
        let lastname = profile.name.familyName;
        lastname = lastname.replace("'", "''");
        let email = profile.emails[0].value;
        queries.upsertGuest(email, firstname, lastname);
        done(null, {email, firstname, lastname});
    }))

// Express and Passport Session
app.use(sessionmanager.sharedSession);
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);
// app.use('/About/', about);

app.get('/host/auth/google',
    passport.authenticate('host', { scope: ['profile', 'email'] }));

app.get('/host/auth/google/callback',
    passport.authenticate('host', {
        successRedirect: '/Host/',
        failureRedirect: '/',
        failureFlash: true
    }));

app.get('/guest/auth/google',
    passport.authenticate('guest', { scope: ['profile', 'email'] }));

app.get('/guest/auth/google/callback',
    passport.authenticate('guest', {
        successRedirect: '/Guest/',
        failureRedirect: '/',
        failureFlash: true
    }));
app.use('/About/', (req, res) => {
    res.sendFile('/public/about.html', { "root": __dirname });
});

app.get('*', ensureAuthenticated, (req, res, next) => {
    res.sendFile('/public/index.html', { "root": __dirname });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

module.exports = app
