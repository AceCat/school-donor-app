var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/school';

console.log("testing")

mongoose.openUri(connectionString);

mongoose.connection.on('connected', function() {
	console.log('connected to ' + connectionString);
})

// mongoose.connection.on('error', function() {
// 	console.log('mongodb error ' + error);
// })

mongoose.connection.on('disconnected', function() {
	console.log('mongoose disconnected from ' + connectionString);
})
