var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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