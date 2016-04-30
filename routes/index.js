var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res) {
   var userName = req.body.userName;

   res.redirect('/');//('index', { data : userName });
});

module.exports = router;
