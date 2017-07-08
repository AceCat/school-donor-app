var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  userType: String,
  password: String,
  isSchool: Boolean,
  isUser: Boolean,
  email: String,
  address: String,
  image: String,
  description: String,
	openItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
	closedItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});

UserSchema.index({name: 'text', openItems: 'text'})
// UserSchema.index({'$**': 'text'});


var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
