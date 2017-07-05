var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var server = require('http').createServer(app);
var UsersController = require('./controllers/UserController.js')
var ItemController = require('./controllers/ItemController')


	require('./db/db.js')

	app.use('/users', UsersController);
	app.use('/item', ItemController);

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hbs');

server.listen(3000, function () {
	console.log("listening on port 3000")
})
