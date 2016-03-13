var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
		state : String,
		city : String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CityList', citySchema);