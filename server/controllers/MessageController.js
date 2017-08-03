var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('../models/User');
var Item = require('../models/Item');
var Message = require('../models/Message');
var path = require('path');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (request, response) {
Message.find(function(error, messages) {
		console.log(error)
      var allMessages = messages
      response.send(allMessages);
  })
});

router.post('/', function(request, response){
	var message = new Message({
		text: request.body.text,
		request: request.body.request,
		sender: request.body.sender,
		recipient: request.body.recipient,
		senderName: request.body.senderName,
		requestName: request.body.requestName,
		senderIsSchool: request.body.senderIsSchool,
		pending: request.body.pending
	});
	message.save();
	messageId = message.id;
	User.findById(message.recipient, function(err, user){
		user.inbox.push(messageId);
		user.save();
		response.redirect('back');
	})
})

module.exports = router;
