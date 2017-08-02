var dotenv = require('dotenv').config()
var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var handlebars = require('hbs');
handlebars.registerHelper("reverse", function(arr) {
	arr.reverse()
});
var helpers = require('handlebars-helpers')(['array', 'reverse']);
var server = require('http').createServer(app);

var ItemController = require('./controllers/ItemController')
var MessageController = require('./controllers/MessageController')
var UsersController = require('./controllers/UserController.js')


var port = server.listen(3000);


app.use(session({
	secret: "I'm very secretive",
	resave: false,
	saveUnitialized: true,
	cookie: {secure: false}
}));

	require('./db/db.js')

	app.use('/item', ItemController);
	app.use('/messages', MessageController);
	app.use('/users', UsersController);



//This instructs the server to check and upload static paths first
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/profiles', ProfilesController);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

server.listen(3000, function () {

	console.log("listening on port " + port);
})
