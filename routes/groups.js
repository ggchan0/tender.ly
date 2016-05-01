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

router.post('/addMember/:name', function(req, res, next) {
   var email = req.body.email;

   Group.findOne({ name : req.params.name }, function(err, group) {
   if (err) throw err;
      if (!group.emails) {
         group.emails = [];
      }
      group.emails.push(email);
      group.save(function(err) {
      if (err) throw err;
         console.log('Group created!');
      });
      res.redirect('/groups/group/' + req.params.name);
   });

});

router.get('/group/:name', function(req, res) {
   Group.find({ name : req.params.name }, function(err, group) {
   if (err) throw err;

   // object of the user
   console.log(group);
      res.render('groups/page', { groupData : group });
   });
});



module.exports = router;
