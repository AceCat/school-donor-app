require('dotenv').config()

var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var handlebars = require('hbs');
var server = require('http').createServer(app);
var UsersController = require('./controllers/UserController.js')
var ItemController = require('./controllers/ItemController')
var port = process.env.PORT || 3000;


app.use(session({
	secret: "I'm very secretive",
	resave: false,
	saveUnitialized: true,
	cookie: {secure: false}
}));

	require('./db/db.js')

	app.use('/users', UsersController);
	app.use('/item', ItemController);


//This instructs the server to check and upload static paths first
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/profiles', ProfilesController);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

server.listen(port, function () {
	console.log("listening on port 3000")
})
