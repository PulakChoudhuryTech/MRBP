var mongoose = require('mongoose');
var moment = require('moment');

// Meeting Room Schema
var meetingRoomBookingSchema = mongoose.Schema({
	attendies : [{
				name : { type: String, required: true },
				empId: { type: Number, required: true },
				email: { type: String, required: true },
				_id : false
	}],
	roomName: { type: String, required: true },
	bookingDtm: { type: Number, required: true },
	bookFrom: { type: String, required: true },
	bookTo: { type: String, required: true },
	bookedBy: { type: String, required: true },
	notification : { type: Boolean, required: false }
});

//Customize the response
meetingRoomBookingSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.bookingId = ret._id;
         ret.bookingDate = moment(ret.bookingDtm).format("DD/MM/YYYY");
         delete ret._id;
         delete ret.__v;
     }
}); 

//validation for attendies attribute in schema
meetingRoomBookingSchema.path('attendies').validate(function(features){
    if (!features) { return false }
    else if (features.length === 0) { return false }
    return true;
}, 'name is inappropriate');

//model
var MeetingRoomBooking = module.exports = mongoose.model('MeetingRoomBooking', meetingRoomBookingSchema);

// Get Meetings list
module.exports.getBookingList = function (callback, limit) {
	MeetingRoomBooking.find(callback).limit(limit);
};

// Add Meeting Room
module.exports.bookMeetingRoom = function (bookingDetails, callback) {
	MeetingRoomBooking.create(bookingDetails, callback);
};

// Remove Meeting
module.exports.removeMeeting = function (meetingId, callback) {
	MeetingRoomBooking.remove({_id: meetingId}, callback);
};

// Update Meeting
module.exports.updateMeeting = function (meetingId, bookingDetails, callback) {
	MeetingRoomBooking.update({_id: meetingId}, bookingDetails, callback);
};