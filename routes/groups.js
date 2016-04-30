var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
 res.render('groups');
});

router.get('/view', function(req, res, next) {
 res.render('groups/view');
});

router.get('/edit', function(req, res, next) {
 res.render('groups/edit');
});



module.exports = router;
