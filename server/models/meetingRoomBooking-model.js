var mongoose = require('mongoose');

// Meeting Room Schema
var meetingRoomBookingSchema = mongoose.Schema({
	attendies : [{
				name : String,
				empId: Number,
				_id : false
	}],
	roomName: String,
	bookingDate: Number,
	bookFrom: String,
	bookTo: String,
	bookedBy: String
});

//Customize the response
meetingRoomBookingSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.bookingId = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

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

// Remove Meeting
module.exports.updateMeeting = function (meetingId, bookingDetails, callback) {
	MeetingRoomBooking.update({_id: meetingId}, bookingDetails, callback);
};