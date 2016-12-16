var config = require('../config');
var sg = require('sendgrid')(config.sendgridApiKey);
var _ = require('underscore');
var moment = require('moment');
var schedule = require('node-schedule');
var scheduledMeetings = {};

// Email notifications to user after registration
module.exports.sendUserRegNotificationEmail = function(userName) {

	var emailbody = {
						"personalizations": [{
							"to": [{
								"email": "pulakdj89@gmail.com"
							}],
							"substitutions" : {
								"%userName%" : userName
							}
						}],
						"from": {
							"email": "MRBP <pulak89@sendgrid.com>"
						},
						"template_id": "89f330ca-1a1a-42d4-8e4f-ddff3d898257"
					};
	sendEmail(emailbody, function (error, response) {
		  if (error) {
		    console.log('Error response received');
		  } else { }
	});
};

//Email notification to user for meeting confirmation
module.exports.sendMeetingConfirmationEmail = function(meetingDetails) {

	var attendiesEmails = _.map(meetingDetails.attendies, function(value) {
		return { "email" : value.email }
	});

	var emailbody = {
						"personalizations": [{
							"to": attendiesEmails,
							"substitutions" : {
								"%bookedByName%" : meetingDetails.bookedBy.name,
								"%bookFromTime%" : moment(meetingDetails.bookingFromDtm).format("hh:mm a"),
								"%bookToTime%" :  moment(meetingDetails.bookingToDtm).format("hh:mm a"),
								"%bookingDate%" : moment(meetingDetails.bookingDtm).format("DD/MM/YYYY")

							}
						}],
						"from": {
							"email": "MRBP <pulak89@sendgrid.com>"
						},
						"template_id": "4586e8ac-dec6-4576-baf8-a005f4139224"
					};
	//checks for attachments			
	if (meetingDetails.attachments && meetingDetails.attachments.length) {
		emailbody.attachments = meetingDetails.attachments;
	}
	//API for sendgrid mail 
	sendEmail(emailbody, function (error, response) {
		  if (error) {
		    console.log('Error response received');
		  } else { 
			  scheduleMeetingAlertEmail(meetingDetails)
			}
	});
};

//meeting cancellation email
module.exports.sendMeetingCancellationEmail = function(meetingDetails) {

	//cancels the scheduled jobs
	cancelScheduledJob(meetingDetails);

	//gets array of email objects
	var attendiesEmails = _.map(meetingDetails.attendies, function(value) {
		return { "email" : value.email }
	});

	var emailbody = {
						"personalizations": [{
							"to": attendiesEmails,
							"substitutions" : {
								"%cancelledByName%" : meetingDetails.cancelledBy,
								"%meetingFromTime%" : moment(meetingDetails.bookingFromDtm).format("hh:mm a"),
								"%meetingToTime%" :  moment(meetingDetails.bookingToDtm).format("hh:mm a"),
								"%meetingDate%" : moment(meetingDetails.bookingDtm).format("DD/MM/YYYY"),
								"%cancellationReason%" : meetingDetails.cancellationReason

							}
						}],
						"from": {
							"email": "MRBP <pulak89@sendgrid.com>"
						},
						"template_id": "8cbfdb24-dd8c-49ca-a3c4-e91cb97dc613"
					};
	//checks for attachments			
	if (meetingDetails.attachments && meetingDetails.attachments.length) {
		emailbody.attachments = meetingDetails.attachments;
	}

	//API for sendgrid mail 
	sendEmail(emailbody, function (error, response) {
		  if (error) {
		    console.log('Error response received');
		  }
	});
};

//Email notification to user for meeting confirmation
function scheduleMeetingAlertEmail(meetingDetails) {
	//schedules alert mail prior to min from meeting
	var date = new Date(meetingDetails.bookingFromDtm - (15 * 60000));
	scheduledMeetings[meetingDetails._id] = schedule.scheduleJob(date, function() {
		var emailbody = {
							"personalizations": [{
								"to": [{"email" : "pulakdj89@gmail.com"}],
								"substitutions" : {
									"%meetingDate%" : moment(meetingDetails.bookingFromDtm).format("DD/MM/YYYY")
								}
							}],
							"from": {
								"email": "pulak89@sendgrid.com"
							},
							"template_id": "54c1c884-eb3d-4b7f-89c2-304fc4f5f9d4"
						}
	  	sendEmail(emailbody, function (error, response) {
			  if (error) {
			    console.log('Error response received');
			  } else { }
		});
	});
};

function cancelScheduledJob(meetingDetails) {
	var scheduledJob = scheduledMeetings[meetingDetails.bookingId];
	if (scheduledJob) {
		scheduledJob.cancel();
		delete scheduledMeetings[meetingDetails.bookingId];
	}
}

function sendEmail(emailbody, callback) {
	//API for sendgrid mail 
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: emailbody
	});
	sg.API(request, callback);
};
