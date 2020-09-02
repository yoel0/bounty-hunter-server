// import mongoose
const mongoose = require('mongoose');

// Create hunter Schema
let hunterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 99,
	},
	notoriety: {
		type: String,
		default: 'Unknown',
	},
});

// Creae bounty Schema
let bountySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 100,
	},
	wantedFor: {
		type: String,
		required: true,
	},
	client: {
		type: String,
		required: true,
	},
	ship: String,
	reward: {
		type: Number,
		default: 100000,
	},
	hunters: { hunterSchema },
	captured: {
		type: Boolean,
		default: false,
	},
	lastSeen: String,
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department',
	},
});

// Export the model
module.exports = mongoose.model('Bounty', bountySchema);
