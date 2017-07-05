var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  userType: String,
  password: String,
  schoolType: String,
  email: String,
  address: String,
  image: String,
  description: String,
	openItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
	closedItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
