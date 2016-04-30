var express = require('express');
var router = express.Router();
var Group = require('../app/models/group');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
 res.render('groups');
});

router.get('/view', function(req, res, next) {
 res.render('groups/view');
});

router.get('/edit', function(req, res, next) {
   Group.find({ owner : 'Later' }, function(err, group) {
   if (err) throw err;

   // object of the user
   console.log(group);
   res.render('groups/edit', { groupData : group });
   });

});

router.post('/add', function(req, res, next) {
   var gName = req.body.groupName;
   var newGroup = Group({
      owner : "Later",
      name : gName
   });

   newGroup.save(function(err) {
   if (err) throw err;
      console.log('Group created!');
   });
   res.redirect('/groups/edit');
});



module.exports = router;