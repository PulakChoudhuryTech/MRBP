var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

const baseUrl = '/mrbp/api';
UserCredential = require('./models/userCredential');

// Connect to Mongoose
mongoose.connect('mongodb://pulak.mrbp:mrbpapp2016@ds119618.mlab.com:19618/mrbp_app');

var db = mongoose.connection;

//ROUTES
app.get('/', function(req, res) {
	res.send('MRBP Application');
});

app.get(baseUrl + '/users', function(req, res) {
	UserCredential.getUsers(function(err, users) {
		if (err) {
			throw err;
		}
		res.json(users);
	});
});

app.post(baseUrl + '/users/registration', function(req, res) {
	var userDetails = req.body;
	UserCredential.addUser(userDetails, function(err, userDetails) {
		if (err) {
			throw err;
		}
		res.json(userDetails);
	});
});

app.get(baseUrl + '/user/:id', function(req, res) {
	var id = req.params.id;
	UserCredential.getUserById(id, function(err, user) {
		if (err) {
			throw err;
		}
		res.json(user);
	});
});

app.listen(3000);
console.log('Running on port 3000...');