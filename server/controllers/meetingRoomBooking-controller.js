var mongooseErrorHandler = require('mongoose-error-handler');
var HttpStatus = require('http-status-codes');

module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	var MeetingRoomBook = app.models.meetingRoomBook;
	var EmailNotification = app.models.emailNotification;
	
	//ROUTES
	//POST: book a meeting room
	app.post(baseUrl + '/meetingroom/book', function(req, res) {

		var bookingDetails = req.body;

		var filterObj = {
			bookingFromDtm : bookingDetails.bookingFromDtm,
			bookingToDtm : bookingDetails.bookingToDtm
		};
		//Validates if some other meeting already booked by the given time preiod
		MeetingRoomBook.filterMeetingBookings(filterObj, function (err, seachResult) {
			if (seachResult.length) {
				res.status(HttpStatus.CONFLICT).json({success: false, msg: "Selected time period has already been booked for some other meeting"});
				return;
			} 
			//Goes for new entry
			MeetingRoomBook.bookMeetingRoom(bookingDetails, function (err, bookingDetails) {
				if (err) {
					res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
				}
				if (bookingDetails && bookingDetails.notification) {
					EmailNotification.sendMeetingConfirmationEmail(bookingDetails);
				}
				res.json(bookingDetails);
			});
		});
	});

	//GET: get all booking list
	app.get(baseUrl + '/meetingroom/bookings/list', function (req, res) {
		MeetingRoomBook.getBookingList(function(err, rooms) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	//GET: get booking list by RoomId
	app.get(baseUrl + '/meetingroom/bookings/room/:id', function (req, res) {
		var roomId = req.param.id;
		MeetingRoomBook.getMeetingListByRoomId(roomId, function(err, bookingDetails) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(bookingDetails);
		});
	});

	//DELETE: remove specific meeting
	app.delete(baseUrl + '/meetingroom/bookings/:id', function (req, res) {
		var meetingId = req.params.id;
		MeetingRoomBook.removeMeeting(meetingId, function (err, rooms) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	//PUT: update specific meeting
	app.put(baseUrl + '/meetingroom/bookings/:id/update', function (req, res) {
		var meetingId = req.params.id;
		var bookingDetails = req.body;
		MeetingRoomBook.updateMeeting(meetingId, bookingDetails, function (err, rooms) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(rooms);
		});
	});

	//POST: Cancel scheduled meetings
	app.post(baseUrl + '/meetingroom/bookings/cancel', function (req, res) {
		var meetingDetails = req.body;
		MeetingRoomBook.cancelScheduledMeetings(meetingDetails, function(err, meetings) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json({success : "OK"});
			if (meetingDetails && meetingDetails.notification) {
				EmailNotification.sendMeetingCancellationEmail(meetings);
			}
		});
	});

	//POST: filter by parameters
	app.post(baseUrl + '/meetingroom/bookings/filter', function (req, res) {
		var bookingDetails = req.body;
		MeetingRoomBook.filterMeetingBookings(bookingDetails, function (err, seachResult) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(seachResult);
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};
