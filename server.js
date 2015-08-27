//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//set up express app
var app = express();
app.use(express.static(__dirname + '/public'));

//include session middleware 
app.use(session({
    secret: 'woot123456'
})); //now, our express app is configured with a session with a secret

//include passport middleware
app.use(passport.initialize());
app.use(passport.session()); //now passport knows how to use session

//define Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: '404071256470186',
    clientSecret: '39564add7587882300cc73d8c7745a37',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
    return done(null, profile);
}));

//define auth endpoints
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/login'
}), function(req, res) {
	console.log(req.session);
});

app.listen(3000, function() {

});