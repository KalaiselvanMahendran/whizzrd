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
		username: String,
		password: String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmployeeList', employeeSchema);

// order: [{
		// 	client_name: String,
		// 	client_email: String,
		// 	client_mobile: String,
		// 	client_address: String,
		// 	service_name : String,
		// 	specifications : [{
		// 		type: String
		// 	}],
		// 	booking_date: String,
		// 	booking_time: String, 
		// 	payment_type: String,
		// 	status: {type: String, default: 'Pending'},
		// 	area_name: String,
		// 	created_at: { type: Date, default: Date.now }
		// }],