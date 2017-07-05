var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: String,
	open: Boolean,
	image: String,
	description: String,
	owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	ownerName: String
});

var itemModel = mongoose.model('Item', ItemSchema);

module.exports = itemModel;
