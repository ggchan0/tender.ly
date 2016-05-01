var mongoose = require('mongoose');
//schema for mongoose, a group has an owner (TODO make it use google auth)
//a group name, and an array of emails that belong to that group
var group = mongoose.Schema({
   owner : String,
   name : String,
   emails : {type : [String], unique: true}
});

var group = mongoose.model('Group', group);

module.exports = group;
