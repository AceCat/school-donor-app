var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var server = require('http').createServer(app);

	require('./db/db.js')

var ItemController = require('./controllers/ItemController')

app.use('/item', ItemController);

server.listen(3000, function () {
	console.log("listening on port 3000")
})
