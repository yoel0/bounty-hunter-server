// set up mongoose connection
const mongoose = require('mongoose');

// Mongo Connection String
// this will automatically create the db if it doesn't already exist
mongoose.connect('mongodb://localhost/bountyhunters', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
});

// shortcut to our mongoose.connection object
const db = mongoose.connection;

// set up an event listener to fire once the connection 'opens'
// to console.log what host and port it is running on
db.once('open', () => {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// set up an event listener to fire on database error and console.log
// the error object
db.on('error', error => {
	console.log(`Database error:\n${error}`);
});

// Export all the things
module.exports.Bounty = require('./bounty');
