var mongoose = require('mongoose');

var specificationSchema = mongoose.Schema({
		specification_name : String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SpecificationList', specificationSchema);