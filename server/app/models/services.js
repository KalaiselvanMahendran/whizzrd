var mongoose = require('mongoose');

var servicesSchema = mongoose.Schema({
		service_name : String,
		specifications : [{
				type: String
		}],
		city_name : String,
		area_name : String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServicesList', servicesSchema);