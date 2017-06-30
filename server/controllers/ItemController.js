var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', 
