var mongoose = require('mongoose');
//and event has an owner (TODO use google auth) and an array of timeslots that each
//have a data and a group associated with them
var eventSchema = mongoose.Schema({
   owner : String,
   timeSlot : [{
      date : Date,
      group : { type: Schema.Types.ObjectId , ref: 'Group' }
   }]
});



var EventMod = mongoose.model('EventMod', eventSchema);

module.exports = EventMod;
