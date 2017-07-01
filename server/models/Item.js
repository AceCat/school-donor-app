var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: String,
	open: Boolean,
	image: String,
	description: String,
	owner: {mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var itemModel = mongoose.model('Item', ItemSchema);

module.exports = itemModel;
