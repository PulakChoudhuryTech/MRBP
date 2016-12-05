var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

// Email notifications to user after registration
module.exports.sendUserRegNotificationEmail = function(userName) {
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: {
				"personalizations": [{
					"to": [{
						"email": "pulakdj89@gmail.com"
					}],
					"substitutions" : {
						"%userName%" : userName
					}
				}],
				"from": {
					"email": "pulak89@sendgrid.com"
				},
				"template_id": "89f330ca-1a1a-42d4-8e4f-ddff3d898257",
			}
	});

	sg.API(request, function(error, response) {
	  if (error) {
	    console.log('Error response received');
	  }
	});
};

//Email notification to user for meeting confirmation

module.exports.sendMeetingConfirmationEmail = function(meetingDetails) {
	console.log(meetingDetails);
	var emails = _.pluck(meetingDetails.attendies, 'email');
	
	// var request = sg.emptyRequest({
	//   method: 'POST',
	//   path: '/v3/mail/send',
	//   body: {
	// 			"personalizations": [{
	// 				"to": [{
	// 					"email": "pulakdj89@gmail.com"
	// 				}],
	// 				"substitutions" : {
	// 					"%userName%" : userName
	// 				}
	// 			}],
	// 			"from": {
	// 				"email": "pulak89@sendgrid.com"
	// 			},
	// 			"template_id": "4586e8ac-dec6-4576-baf8-a005f4139224",
	// 		}
	// });

	// sg.API(request, function(error, response) {
	//   if (error) {
	//     console.log('Error response received');
	//   }
	// });
};