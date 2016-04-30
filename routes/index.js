/*var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res) {
   var userName = req.body.userName;

   res.redirect('/');//('index', { data : userName });
});
*/
//module.exports = router;

module.exports = function(app, passport) {
  app.get('/', function(req, res, next) {
    res.render('index');
  });

  app.post('/login', function(req, res) {
     var userName = req.body.userName;

     res.redirect('/');//('index', { data : userName });
  });

  app.get('/about', function(req, res, next) {
     res.render('about');
  });

  app.get('/contact', function(req, res, next) {
     res.render('contact');
  });
}
