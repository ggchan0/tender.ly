var mongoose = require('mongoose');
var 
var eventSchema = mongoose.Schema({
   owner : String,
   timeSlot : [{
      date : Date,
      group : { type: Schema.Types.ObjectId , ref: 'Group' }
   }]
});



var EventMod = mongoose.model('EventMod', eventSchema);

module.exports = EventMod;
