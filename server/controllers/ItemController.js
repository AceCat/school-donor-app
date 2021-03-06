var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('../models/User');
var Item = require('../models/Item');
var path = require('path')

router.use(bodyParser.urlencoded({extended: true}));

router.get('/all', function(request, response){
    Item.find(function(error, items){
        response.json(items)
    });
});

router.get('/browser', function(request, response){
    var session = request.session;
    Item.find( {open: true}, function(error, items){
        response.render('browser', {items: items, session: session})
    });
});

router.get('/:id', function(request, response){
    var id = request.params.id;
    Item.findById(id, function(error, item){
        response.json(item)
    });
});

router.post('/search', function(request, response) {
    var searchTerm = request.body.searchTerm;
    console.log(request.body.searchTerm);
    Item.find({$text: {$search: searchTerm}, open: true})
    .exec(function(err, items) {
        console.log(items)

        
        var itemsObj = {items: items};
        response.render('search', itemsObj)
    });


})

router.post('/', function(request, response){
    var item = new Item({
        name: request.body.name,
        open: request.body.open,
        image: request.body.image,
        description: request.body.description,
        owner: request.body.owner,
        ownerName: request.body.ownerName,
        ownerIsSchool: request.body.ownerIsSchool
    });
    item.save();
    var itemId = item.id;
    User.findById(item.owner, function(err, user) {
        user.openItems.push(item.id);
        user.save();
        response.redirect(request.get('referer'));

    })
});

// router.post('/delete/:id', function(request, response){
//     var id = request.params.id
//     Item.findById(id, function(error, item){
//         item.remove()
//         response.redirect(request.headers.referer)
//     })
// })

router.patch('/:id', function(request, response){
    //grab item key
    var id = request.params.id;
    Item.findById(id, function(error, item){
        item.name = request.body.name
        item.open = request.body.open
        item.image = request.body.image
        item.description = request.body.description
        item.owner = request.body.owner
        item.save();
        response.json(item);
    });
});

router.delete('/:id', function(request, response){
    //grab item key
    var id = request.params.id;
    Item.findById(id, function(error, item){
        item.remove();
        response.json(item);
    });
});

module.exports = router;
