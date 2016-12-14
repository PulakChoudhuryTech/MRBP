var mongoose = require('mongoose');

// Meeting Room Schema
var MRBPConfigSchema = mongoose.Schema({
	mrbpConfig : {}	
});

//model
var MRBPConfig = module.exports = mongoose.model('MRBPConfig', MRBPConfigSchema);

// Get Mrbp Configuration
module.exports.getMrbpConfig = function (callback, limit) {
	MRBPConfig.find(callback).limit(limit);
};

// Update Mrbp configuration
module.exports.updateMrbpConfig = function (mrbpConfig, callback) {
	MRBPConfig.update(mrbpConfig, callback);
};
