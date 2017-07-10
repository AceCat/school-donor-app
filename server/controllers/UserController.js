var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Item = require('../models/Item');
var bodyParser = require('body-parser');
var path = require('path');
var bcrypt = require('bcryptjs');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCooANqXEzmEUON691FrajORhBvhtbMrSY', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);


router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (request, response) {
User.find(function(error, users) {
      var session = request.session;
      var allUsers = {allUsers: users, session: session};
    response.send(users);
  })
});

router.get('/register', function(request, response){
  response.render('register')
})

router.get('/login', function(request, response){
  response.render('login')
})

router.get('/edit/:id', function(request, response) {
  var id = request.params.id;
  User.findById(id, function(err, user){
    var sendOver = {user: user, session: request.session}
    console.log(sendOver);
    response.render('edit', sendOver)

  })
});

router.get('/logout', function(request, response) {
  request.session.loggedIn = false;
  response.redirect('/item/browser');
});

router.get('/:id', function(request, response){
  var userId = request.params.id;
  var onOwnPage = "";
  if (userId === request.session.sessionId) {
    onOwnPage = true;
  } else {
    onOwnPage = false;
  }
  User.findById(userId).populate('openItems').populate('closedItems').populate('claimedItems').exec(function (err, user){
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
  var address = request.body.address;
  var latitude;
  var longitude;
  geocoder.geocode(address, function(err, res) {
    if (err) {
    } else {
    console.log(res);
    console.log(res[0])
    latitude = res[0].latitude
    longitude = res[0].longitude
  }
  bcrypt.hash(request.body.password, 10, function(error, hash){
  	var user = new User ({
  		name: request.body.name,
  		userType: request.body.type,
  		password: hash,
        isSchool: request.body.isSchool,
        isUser: request.body.isUser,
        schoolType: request.body.schoolType,
  		email: request.body.email,
  		address: request.body.address,
      latitude: latitude,
      longitude: longitude,
  		image: request.body.image,
  		description: request.body.description
  	})
  	user.save();
//Posting to this route will set a global session variable of logged-in to true
//and set a global variable that's equal to the user's ID
  	userId = user.id;
  	request.session.loggedIn = true;
  	request.session.sessionId = userId;
    response.send(userId);
  	})
  })
})


router.post('/move-open', function (request, response){
  Item.findById(request.body.itemId, function(request, item) {
    item.open = false;
    item.save();
    console.log(item);
  })
  User.findById(request.session.sessionId, function(err, user){
    var indexToChange = user.openItems.indexOf(request.body.itemId);
    user.openItems.splice(indexToChange, 1)
    user.closedItems.addToSet(request.body.itemId);
    user.save();
    response.redirect('/users/' + request.session.sessionId)
  })
});

router.post('/move-closed', function (request, response){
  Item.findById(request.body.itemId, function(err, item) {
    item.open = true;
    item.save();
  })
  User.findById(request.session.sessionId, function(err, user){
    var indexToChange = user.closedItems.indexOf(request.body.itemId);
    user.closedItems.splice(indexToChange, 1)
    user.openItems.addToSet(request.body.itemId);
    user.save();
    response.redirect('/users/' + request.session.sessionId)

  })
});

router.post('/claim-item', function (request, response){
  Item.findById(request.body.itemId, function (err, item){
    item.open = false;
    item.save();
  })
  User.findById(request.session.sessionId, function(err, user){
    user.claimedItems.addToSet(request.body.itemId);
    user.save();
  })
  User.findById(request.body.ownerId, function(err, user){
    console.log(user)
    var indexToChange = user.openItems.indexOf(request.body.itemId);
    user.openItems.splice(indexToChange, 1);
    user.closedItems.addToSet(request.body.itemId);
    user.save();
    response.redirect('/users/' + request.session.sessionId)
  })
})




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
    user.isSchool = request.body.isSchool;
    user.schoolType = request.body.schoolType;
    user.contact = request.body.contact;
    user.address = request.body.address;
    user.image = request.body.image
    user.description =request.body.description
    user.save();
    response.send(id);
  })
})


router.patch('/edit/:id', function(request, response){
  var id = request.params.id;
  User.findById(id, function(err, user){
    user.name = request.body.name;
    user.isSchool = request.body.isSchool;
    user.isUser = request.body.isUser
    user.address = request.body.address;
    user.description = request.body.description;
    user.image = request.body.image;
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
