var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
		customer_name: String,
		customer_email: String,
		customer_mobile: String,
		otp: String,
		order: [{
			area_name: String,
			service_name : String,
			specifications : [{
				type: String
			}],
			employee: String,
			booking_date: String,
			booking_time: String, 
			payment_type: String,
			status: {type: String, default: 'Pending'},
			created_at: { type: Date, default: Date.now }
		}],
		customer_address: String,
		area_name: String,
		city_name: String,
		customer_landmark: String,
		created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookingList', bookingSchema);
