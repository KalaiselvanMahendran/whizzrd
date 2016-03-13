var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
		service_name : String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceList', serviceSchema);
