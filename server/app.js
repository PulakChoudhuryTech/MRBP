var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('lodash');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const baseUrl = '/mrbp/api';

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.models = require('./models/index');
// Connect to Mongoose
mongoose.connect('mongodb://pulak.mrbp:mrbpapp2016@ds119618.mlab.com:19618/mrbp_app');

var db = mongoose.connection;

//ROUTES
app.get('/', function(req, res) {

	// var helper = require('sendgrid').mail;
	// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	// var from_email = new helper.Email('pulak89@sendgrid.com');
	// var to_email = new helper.Email('pulakdj89@gmail.com');
	// var subject = 'Subject';
	// var content = new helper.Content('text/plain', 'test');
	// var mail = new helper.Mail(from_email, subject, to_email, content);

	// var request = sg.emptyRequest({
	//   method: 'POST',
	//   path: '/v3/mail/send',
	//   body: mail.toJSON(),
	// });

	// sg.API(request, function(err, response) {
	//   console.log(response.statusCode);
	//   console.log(response.body);
	//   console.log(response.headers);
	// });

	res.send('MRBP Application');
});

// Load the routes.
var routes = require('./routes');
_.each(routes, function(controller, route) {
	app.use(route, controller(app, route));
});

app.listen(3000);
console.log('Running on port 3000...');
