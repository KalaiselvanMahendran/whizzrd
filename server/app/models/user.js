var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	local: {
		name : String,
		username : String,
		password : String,
		date: { type: Date, default: Date.now }
	},
});

module.exports = mongoose.model('User', userSchema);