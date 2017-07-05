var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bodyParser = require('body-parser');
var path = require('path');
var bcrypt = require('bcryptjs');


router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (request, response) {
User.find(function(error, users) {
      var session = request.session;
      var allUsers = {allUsers: users, session: session};
    response.json(users);
  })
});

router.get('/register', function(request, response){
  response.render('register')
})

//A post request to /users

router.post('/', function (request, response) {
  bcrypt.hash(request.body.password, 10, function(error, hash){
  	var user = new User ({
  		name: request.body.name,
  		userType: request.body.type,
  		password: hash,
  		schoolType: request.body.schoolType,
  		email: request.body.email,
  		address: request.body.address,
  		image: request.body.image,
  		description: request.body.description
  	})
  	user.save();
//Posting to this route will set a global session variable of logged-in to true
//and set a global variable that's equal to the user's ID
  	userId = user.id;
  	// request.session.loggedIn = true;
  	// request.session.sessionId = userId;
  	response.send(user)
	})
})

router.patch('/:id', function(request, response){
  var id = request.params.id;
  User.findById(id, function(err, user){
    user.name = request.body.name;
    user.userType = request.body.userType;
    user.password = request.body.password;
    user.schoolType = request.body.schoolType;
    user.contact = request.body.contact;
    user.address = request.body.address;
    user.image = request.body.image
    user.description =request.body.description
    user.save();
    response.send(id);
  })
})


router.delete('/:id', function(request, response){
  var id = request.params.id;
  User.findById(id, function(err, user){
   user.remove();
   response.send("Removed user")
  })
})

module.exports = router;
