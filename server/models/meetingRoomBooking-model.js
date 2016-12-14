var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('underscore');
var appConstant = require('../lib/constant');
var UserCredentialModel = require('./userCredential-model');

// Meeting Room Schema
var meetingRoomBookingSchema = mongoose.Schema({
	attendies : [{
				name : { type: String, required: true },
				empId: { type: Number, required: true },
				email: { type: String, required: true },
				_id : false
	}],
	roomId: { type: String, required: true },
	bookingDtm: { type: Number, required: true },
	bookingFromDtm: { type: Number, required: true },
	bookingToDtm: { type: Number, required: true },
	bookedBy: { name: { type: String, required: true }, userId : { type: String, required: true } },
	notification : { type: Boolean, required: false },
	attachments : [{
          content : { type: String, required: true },
          type : { type: String, required: true },
          filename : { type: String, required: true },
          disposition : { type: String, required: true },
          _id : false
        }],
    meetingTitle: { type: String, required: true },
    status: { type: String },
    cancelledBy : { type: String },
    cancellationReason: { type: String }
});

//Customize the response
meetingRoomBookingSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.bookingId = ret._id;
         ret.bookingDate = moment(ret.bookingDtm).format("DD/MM/YYYY");
         ret.bookToTime = moment(ret.bookingToDtm).format("hh:mm a");
         ret.bookFromTime = moment(ret.bookingFromDtm).format("hh:mm a");
         ret.meetingDate = moment(ret.bookingFromDtm).format("MMMM Do");
         ret.status = getCurrentMeetingStatus(ret);
         if (ret.status != appConstant.MEETINGS.STATUS.CANCELLED) {
         	delete ret.cancelledBy;
         	delete ret.cancellationReason;
         }
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

//Get Meeting details by room id
module.exports.getMeetingListByRoomId = function (roomId, callback) {
	MeetingRoomBooking.find({roomId: roomId}, callback);
};

// Filter Meetings by time
module.exports.filterMeetingBookings = function (bookingDetails, callback) {
	var query = {}
	if (bookingDetails.bookingFromDtm && bookingDetails.bookingFromDtm) {
		query["bookingFromDtm"] = { $lte: bookingDetails.bookingToDtm };
		query["bookingToDtm"] = { $gte: bookingDetails.bookingFromDtm };
	} 
	if (bookingDetails.userId) {
		query["bookedBy.userId"] = bookingDetails.userId;
	}
	MeetingRoomBooking.find(query, callback);
};

// cancel sheduled meetings
module.exports.cancelScheduledMeetings = function (meetingDetails, callback) {
	MeetingRoomBooking.findOneAndUpdate({_id: meetingDetails.bookingId},
										{ "$set": { 
												status: appConstant.MEETINGS.STATUS.CANCELLED,
												cancelledBy : meetingDetails.cancelledBy,
												attachments : meetingDetails.attachments,
												cancellationReason: meetingDetails.cancellationReason
											}
										}, callback);
};

//returns meeting status
function getCurrentMeetingStatus(meetingDetails) {
	var currentTimeStammp = new Date().getTime();
	var status;
	if (meetingDetails.status === appConstant.MEETINGS.STATUS.CANCELLED) {
		return meetingDetails.status;
	}
	if ((currentTimeStammp > meetingDetails.bookingFromDtm ) && (currentTimeStammp < meetingDetails.bookingToDtm)) {
		status = appConstant.MEETINGS.STATUS.IN_PROGRESS;
	} else if (currentTimeStammp < meetingDetails.bookingFromDtm) {
		status = appConstant.MEETINGS.STATUS.NOT_STARTED;
	} else if (currentTimeStammp > meetingDetails.bookingToDtm) {
		status = appConstant.MEETINGS.STATUS.COMPLETED;
	}
	return status;
}
