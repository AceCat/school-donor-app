var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var server = require('http').createServer(app);
var UsersController = require('./controllers/UserController.js')

	require('./db/db.js')

	app.use('/users', UsersController);


server.listen(3000, function () {
	console.log("listening on port 3000")
})

