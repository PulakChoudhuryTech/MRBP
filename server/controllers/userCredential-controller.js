var mongooseErrorHandler = require('mongoose-error-handler');
var HttpStatus = require('http-status-codes');

module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	
	app.get(baseUrl + '/users', function(req, res) {
		app.models.userCredential.getUsers(function(err, users) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(users);
		});
	});

	app.post(baseUrl + '/users/registration', function(req, res) {
		var userDetails = req.body;
		app.models.userCredential.addUser(userDetails, function(err, userDetails) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			if (userDetails && userDetails.notification) {
				app.models.emailNotification.sendUserRegNotificationEmail(userDetails.name);
			}
			res.json(userDetails);
		});
	});

	app.get(baseUrl + '/user/:id', function(req, res) {
		var id = req.params.id;
		app.models.userCredential.getUserById(id, function(err, user) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(user);
		});
	});

	app.post(baseUrl + '/user/find', function(req, res) {
		var userName = req.body;
		app.models.userCredential.getUserByUserName(userName, function(err, user) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(user);
		});
	});

	app.put(baseUrl + '/user/:id/update', function(req, res) {
		var userDetails = req.body;
		var id = req.params.id;
		app.models.userCredential.updateUser(id, userDetails, function(err, user) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(user);
		});
	});

	app.post(baseUrl + '/user/auth', function(req, res) {
		var userDetails = req.body;
		app.models.userCredential.autherticateUser(userDetails, function(err, user) {
			if (!user) {
				res.send("Invalid User");
				return;
			}
			res.json(user);
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};