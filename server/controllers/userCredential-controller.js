module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';

	app.get(baseUrl + '/users', function(req, res) {
		app.models.userCredential.getUsers(function(err, users) {
			if (err) {
				throw err;
			}
			res.json(users);
		});
	});

	app.post(baseUrl + '/users/registration', function(req, res) {
		var userDetails = req.body;
		app.models.userCredential.addUser(userDetails, function(err, userDetails) {
			if (err) {
				throw err;
			}
			res.json(userDetails);
		});
	});

	app.get(baseUrl + '/user/:id', function(req, res) {
		var id = req.params.id;
		app.models.userCredential.getUserById(id, function(err, user) {
			if (err) {
				throw err;
			}
			res.json(user);
		});
	});

	app.post(baseUrl + '/user/find', function(req, res) {
		var userName = req.body;
		app.models.userCredential.getUserByUserName(userName, function(err, user) {
			if (err) {
				throw err;
			}
			res.json(user);
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};