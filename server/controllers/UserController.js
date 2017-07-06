var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Item = require('../models/Item');
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

router.get('/login', function(request, response){
  response.render('login')
})

router.get('/:id', function(request, response){
  var userId = request.params.id;
  var onOwnPage = "";
  console.log('something');
  if (userId === request.session.sessionId) {
    onOwnPage = true;
    console.log(onOwnPage, 1);
  } else {
    onOwnPage = false;
    console.log(onOwnPage, 2);
  }
  User.findById(userId).populate('openItems').populate('closedItems').exec(function (err, user){
    var pageLoad = {
      user: user,
      onOwnPage: onOwnPage,
      session: request.session
    }
    response.render('profile', pageLoad);
  })
});

///////////////////////////////////////////
//POST REQUESTS
///////////////////////////////////////////
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
    response.send(userId);
  	})
})


router.post('/move-open', function (request, response){
  User.findById(request.session.sessionId, function(err, user){
    user.openItems.pop(request.body.id);
    user.closedItems.addToSet(request.body.id);
    user.save();
  })
  response.redirect('/users/' + request.session.sessionId)

});

router.post('/move-closed', function (request, response){
  User.findById(request.session.sessionId, function(err, user){
    user.closedItems.pop(request.body.id);
    user.openItems.addToSet(request.body.id);
    user.save();
  })
  response.redirect('/users/' + request.session.sessionId)
});




//This is the login post route
router.post('/login', function(request, response){
  User.findOne({email: request.body.email}, function(error, user){
    if(user){
      bcrypt.compare(request.body.password, user.password, function(error, match){
        if (match === true) {
          request.session.loggedIn = true;
          request.session.sessionId = user.id;
          request.session.userName = user.name;
          response.redirect("/users/" + user.id);
        } else {
          response.send("That's the wrong password you scallywag")
        }
      })
    } else {
      response.send("Email not found.")
    }
  })
});




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
