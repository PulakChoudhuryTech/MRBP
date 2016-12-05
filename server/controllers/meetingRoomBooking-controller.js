var mongooseErrorHandler = require('mongoose-error-handler');
var HttpStatus = require('http-status-codes');

module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	var MeetingRoomBook = app.models.meetingRoomBook;
	
	//ROUTES
	app.post(baseUrl + '/meetingroom/book', function(req, res) {
		var bookingDetails = req.body;
		MeetingRoomBook.bookMeetingRoom(bookingDetails, function(err, bookingDetails) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			if (bookingDetails && bookingDetails.notification) {
				app.models.emailNotification.sendMeetingConfirmationEmail(bookingDetails);
			}
			res.json(bookingDetails);
		});
	});

	app.get(baseUrl + '/meetingroom/bookings/list', function(req, res) {
		MeetingRoomBook.getBookingList(function(err, rooms) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	app.delete(baseUrl + '/meetingroom/bookings/:id', function(req, res) {
		var meetingId = req.params.id;
		MeetingRoomBook.removeMeeting(meetingId, function(err, rooms) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	app.put(baseUrl + '/meetingroom/bookings/:id/update', function(req, res) {
		var meetingId = req.params.id;
		var bookingDetails = req.body;
		MeetingRoomBook.updateMeeting(meetingId, bookingDetails, function(err, rooms) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};
