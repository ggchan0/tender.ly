//load local strategy
var LocalStrategy = require('passport-local').Strategy;

//read user model
var User = require('../app/models/user');

//export this function
module.exports = function(passport) {
  //serialize the user for this session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

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
};
