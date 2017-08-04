var mongoose = require('mongoose');
// <<<<<<< HEAD
var connectionString = process.env.DB_HOST;
// =======
// var connectionString = 'mongodb://localhost/school-1';
// >>>>>>> 3f381a494da41d36212adb831f372a417d47afd0

console.log("testing")

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
	console.log('connected to ' + connectionString);
})

// mongoose.connection.on('error', function() {
// 	console.log('mongodb error ' + error);
// })

mongoose.connection.on('disconnected', function() {
	console.log('mongoose disconnected from ' + connectionString);
})
