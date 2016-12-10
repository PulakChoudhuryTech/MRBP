var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var _ = require('underscore');
var moment = require('moment');
var schedule = require('node-schedule');

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
						"template_id": "89f330ca-1a1a-42d4-8e4f-ddff3d898257",
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
								"%bookedByName%" : meetingDetails.bookedBy,
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
	//API for sendgrid mail 
	sendEmail(emailbody, function (error, response) {
		  if (error) {
		    console.log('Error response received');
		  } else { 
			  scheduleMeetingAlertEmail(meetingDetails)
			}
	});
};

//Email notification to user for meeting confirmation
function scheduleMeetingAlertEmail(meetingDetails) {
	var date = new Date(1481372285000);
	var j = schedule.scheduleJob(date, function() {
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

function sendEmail(emailbody, callback) {
	//API for sendgrid mail 
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: emailbody
	});
	sg.API(request, callback);
};
