var mongoose = require('mongoose');

var areaSchema = mongoose.Schema({
		city_name : String,
		area_name : String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AreaList', areaSchema);