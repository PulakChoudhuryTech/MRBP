var mongooseErrorHandler = require('mongoose-error-handler');
var HttpStatus = require('http-status-codes');

module.exports = function(app, route) {
	const baseUrl = '/mrbp/api';
	var ConfigModel = app.models.mrbpConfig;
	
	//ROUTES
	//GET: get mrbp configurations
	app.get(baseUrl + '/mrbpconfig', function(req, res) {
		ConfigModel.getMrbpConfig(function(err, config) {
			if (err) {
				res.status(HttpStatus.NOT_FOUND).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json(config);
		});
	});

	//PUT: update MRBP configuration
	app.put(baseUrl + '/mrbpconfig', function(req, res) {
		var configModel = req.body;
		ConfigModel.updateMrbpConfig(configModel, function(err, configModel) {
			if (err) {
				res.status(HttpStatus.BAD_REQUEST).json({success: false, msg: mongooseErrorHandler.set(err, req.t)});
			}
			res.json({ success : "OK"});
		});
	});

	//Return middleware.
	return function(req, res, next) {
		next();
	};
};