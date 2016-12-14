module.exports = function(app, route) {
	var Client = require('node-rest-client').Client;
	var client = new Client();
	var config = require('../config');
	var extrenalEmployeeList = [];
	const baseUrl = '/mrbp/api';

	// calls external API
	client.get(config.externalEmployeeListUri, function (data, response) {
	    // parsed response body as js object 
	    extrenalEmployeeList = data;
	});

	//GET: get all employee list
	app.get(baseUrl + '/externalresources/employeelist', function (req, res) {
		res.json(extrenalEmployeeList);
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};
