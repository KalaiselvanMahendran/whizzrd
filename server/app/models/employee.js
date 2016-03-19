var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
		name: String,
		service_name : String,
		email: String,
		mobile: String,
		address: String,
		area_name: String,
		city_name: String,
		availabilty: String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmployeeList', employeeSchema);