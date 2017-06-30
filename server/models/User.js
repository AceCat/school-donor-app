var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  userType: String,
  password: String,
  schoolType: String,
  contact: String,
  address: String,
  image: String,
  description: String,
	openItems: [{mongoose.Schema.Types.ObjectId, ref: 'Item'}],
	closedItems: [{mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
