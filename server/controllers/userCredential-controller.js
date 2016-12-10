var mongooseErrorHandler = require('mongoose-error-handler');
var HttpStatus = require('http-status-codes');
var CryptoJS = require("crypto-js");

module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	
	//GET: get list of users
	app.get(baseUrl + '/users', function (req, res) {
		app.models.userCredential.getUsers(function (err, users) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(users);
		});
	});

	//POST: submits user registration
	app.post(baseUrl + '/users/registration', function (req, res) {
		var userDetails = req.body;
		// Decrypt user password 
		var bytes  = CryptoJS.AES.decrypt(userDetails.password.toString(), userDetails.userName);
		userDetails.password = bytes.toString(CryptoJS.enc.Utf8);

		app.models.userCredential.addUser(userDetails, function (err, userDetails) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			if (userDetails && userDetails.notification) {
				app.models.emailNotification.sendUserRegNotificationEmail(userDetails.name);
			}
			res.json(userDetails);
		});
	});

	//GET: get specific user details
	app.get(baseUrl + '/user/:id', function (req, res) {
		var id = req.params.id;
		app.models.userCredential.getUserById(id, function (err, user) {
			if (err) {
				//sending success message for error cases to avoid REST call showcase in browser console
				res.json(null);
			}
			res.json(user);
		});
	});

	//POST: filter user data by given attribute
	app.post(baseUrl + '/user/find', function (req, res) {
		var attr = req.body;
		app.models.userCredential.filterUserByAttr(attr, function (err, user) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(user);
		});
	});

	//PUT: update specific user details
	app.put(baseUrl + '/user/:id/update', function (req, res) {
		var userDetails = req.body;
		var id = req.params.id;
		app.models.userCredential.filterUserByAttr({ _id: id, userName : userDetails.userName }, function(err, user) {
			if (user.length) {
				app.models.userCredential.updateUser(id, userDetails, function (err, user) {
					if (err) {
						res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
					}
					res.json(user);
				});
				return;
			} 
			res.status(HttpStatus.NOT_FOUND).json({success: false, msg: 'Cannot change the userName'});
		});
	});

	//POST: user authentication
	app.post(baseUrl + '/user/auth', function (req, res) {
		var userDetails = req.body;
		// Decrypt user password 
		var bytes  = CryptoJS.AES.decrypt(userDetails.password.toString(), userDetails.userName);
		userDetails.password = bytes.toString(CryptoJS.enc.Utf8);

		app.models.userCredential.authenticateUser(userDetails, function (err, user) {
			if (!user) {
				res.json(null);
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