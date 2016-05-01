//load local strategy
//var LocalStrategy = require('passport-local').Strategy;

//read user model
var mongoose = require('mongoose');

var User = require('../app/models/user');

//for google authentication
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//get credentials
var configAuth = require('./auth');

var passport = require('passport');

//serialize the user for this session
passport.serializeUser(function(user, done) {
  done(null, user);
});

//deserialize the user
passport.deserializeUser(function(user, done) {
  done(null, user);
});
/*
  //handles signup with email and password
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function (req, email, password, done) {
      process.nextTick(function() {
        User.findOne({'local.email' : email}, function(err, user) {
          //return the error
          if (err) {
            return done(err);
          }
          //if the user exists
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email ' +
            'is in use.'));
          } else {
            var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
  }));

  //local login Strategy
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done){
    User.findOne({ 'local.email' : email}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong combo.'));
      }
      return done(null, user);
    });
  }));
  */

  //google's login handler
passport.use(new GoogleStrategy({
  clientID        : configAuth.googleAuth.clientID,
  clientSecret    : configAuth.googleAuth.clientSecret,
  callbackURL     : configAuth.googleAuth.callbackURL,
  passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
    if (req.user) {
      User.find({ id : profile.id }, function(err, existingUser) {
        if (existingUser) {
          req.flash('errors', { msg: "Already on here."});
          return done(err);
        }
      }).limit(1);
    }
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google

    // try to find the user based on their google id
    else {
      User.find({ 'id' : profile.id }, function(err, existingUser) {
        if (err) {
          return done(err);
        }
        if (existingUser) {
          // if a user is found, log them in
          return done(null, existingUser);
        } else {
        User.findOne({email: profile.emails[0].value }, function(err, user) {
          if (user) {
            req.flash('gmailMessage', {msg: "That email already exists. Please us that email."});
            return done(err);
          } else {
            // if the user isnt in our database, create a new user
            var newUser          = new User();
            // set all of the relevant information
            newUser.id    = String(profile.id);
            newUser.tokens.push({kind: 'google', accessToken: accessToken});
            newUser.name  = profile.displayName;
            newUser.email = profile.emails[0].value; // pull the first email
            // save the user
            newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
            });
          }
        });
      }}).limit(1);
    }});
  }
));
