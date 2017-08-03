var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	text: String,
	request: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	senderName: String,
	requestName: String,
	pending: Boolean
});

var messageModel = mongoose.model('Message', MessageSchema);

module.exports = messageModel;
