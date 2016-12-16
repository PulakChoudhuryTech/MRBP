var mongoose = require('mongoose');

// Meeting Room Schema
var MRBPConfigSchema = mongoose.Schema({
	mrbpConfig : {}
});

//Customize the response
MRBPConfigSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         delete ret._id;
     }
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
