var mongoose = require('mongoose');

// Meeting Room Schema
var meetingRoomSchema = mongoose.Schema({
	roomName: {
		type: String,
		required: true
	},
	capacity: {
		type: Number,
		required: true
	},
	status : {
		type: String,
		required: true
	},
	feature:{
		webcam : Boolean,
		phone : Boolean,
		projector : Boolean,
		monitor: Boolean,
		tv : Boolean,
	}
});

//Customize the response
meetingRoomSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.roomId = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

//model
var MeetingRoom = module.exports = mongoose.model('MeetingRoom', meetingRoomSchema);

// Get Meeting Rooms
module.exports.getMeetingRooms = function (callback, limit) {
	MeetingRoom.find(callback).limit(limit);
};

// Add Meeting Room
module.exports.addMeetingRoom = function (user, callback) {
	MeetingRoom.create(user, callback);
};