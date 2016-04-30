var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');

router.use(bodyParser.json());


router.get('/', function(req, res, next) {
 res.render('index');
});
/*
router.post('/login', function(req, res) {
  var userName = req.body.userName;

  res.redirect('/');//('index', { data : userName });
});
*/
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {message: req.flash('signupMessage')});
});

router.get('/login', function(req, res, next) {
  res.render('login', {message: req.flash('loginMessage')});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signupl',
  failureFlash : true
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/profile', function(req, res) {
  res.render('profile');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
