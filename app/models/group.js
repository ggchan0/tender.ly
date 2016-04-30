var mongoose = require('mongoose');

var group = mongoose.Schema({
   owner : String,
   name : String,
   emails : [String]
});

var group = mongoose.model('Group', group);

module.exports = group;