var mongoose = require('mongoose');

// User Credential Schema
var userCredentialSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name : {
		type: String,
		required: true
	},
	empId:{
		type: Number,
		required: true
	},
	email : {
		type: String,
		required: true
	},
	contact: {
		type: Number,
		required: true
	},
	notification: {
		type: Boolean,
		required: true
	}
});

//Customize the response
userCredentialSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
         delete ret.password;
     }
}); 

//model
var UserCredential = module.exports = mongoose.model('UserCredential', userCredentialSchema);

// Get Users
module.exports.getUsers = function (callback, limit) {
	UserCredential.find(callback).limit(limit);
};

// Add Users
module.exports.addUser = function (user, callback) {
	UserCredential.create(user, callback);
};

// Get User by id
module.exports.getUserById = function (uid, callback) {
	UserCredential.findById(uid, callback);
};

// Get User by userName
module.exports.getUserByUserName = function (userName, callback) {
	UserCredential.findOne(userName, callback);
};

// Update User
module.exports.updateUser = function (id, userDetails, callback) {
	UserCredential.update({_id : id}, userDetails, callback);
};

//Autherticate User
module.exports.autherticateUser = function (userDetails, callback) {
	UserCredential.findOne({userName : userDetails.userName, password: userDetails.password}, callback);
};