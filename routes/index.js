var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());


router.get('/', function(req, res, next) {
 res.render('index');
});

router.post('/login', function(req, res) {
  var userName = req.body.userName;

  res.redirect('/');//('index', { data : userName });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signuppost', function(req, res) {
   var emailOne = req.body.emailOne;
   var emailTwo = req.body.emailTwo;
   var password = req.body.password;

   if (emailOne == emailTwo) {
      
   }
});

module.exports = router;
