module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	var MeetingRoom = app.models.meetingRoom;
	
	//ROUTES
	app.get(baseUrl + '/meetingrooms', function(req, res) {
		MeetingRoom.getMeetingRooms(function(err, rooms) {
			if (err) {
				throw err;
			}
			res.json(rooms);
		});
	});

	app.post(baseUrl + '/meetingroom/create', function(req, res) {
		var roomDetails = req.body;
		MeetingRoom.addMeetingRoom(roomDetails, function(err, roomDetails) {
			if (err) {
				throw err;
			}
			res.json(roomDetails);
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};