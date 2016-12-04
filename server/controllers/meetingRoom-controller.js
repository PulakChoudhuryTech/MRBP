var mongooseErrorHandler = require('mongoose-error-handler');
var HttpStatus = require('http-status-codes');

module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	var MeetingRoom = app.models.meetingRoom;
	
	//ROUTES
	app.get(baseUrl + '/meetingrooms', function(req, res) {
		MeetingRoom.getMeetingRooms(function(err, rooms) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	app.post(baseUrl + '/meetingroom/create', function(req, res) {
		var roomDetails = req.body;
		MeetingRoom.addMeetingRoom(roomDetails, function(err, roomDetails) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(roomDetails);
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};