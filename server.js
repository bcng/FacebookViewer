//dependencies
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//set up express app
var app = express();
app.use(express.static(__dirname + '/public'));

//include session middleware
app.use(session({
    secret: 'woot123456'
}));

//include passport middleware
app.use(passport.initialize());
app.use(passport.session());

//define Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: '<your_client_id>',
    clientSecret: '<your_client_secret>',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
    return done(null, profile);
}));
