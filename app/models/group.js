var mongoose = require('mongoose');

var group = mongoose.Schema({
   owner : String,
   name : String,
   emails : {type : [String], unique: true}
});

var group = mongoose.model('Group', group);

module.exports = group;
