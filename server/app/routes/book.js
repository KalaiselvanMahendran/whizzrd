var BookingList = require('../models/booking');
var moment = require('moment');

module.exports = function(router){

	router.get('/', function(req, res){
		res.render('_booking-form');
	});

	// Get Booking List
	router.get('/authenticate/bookinglist', function(req, res){
		BookingList.find(function(err, docs){
			if(err)
				throw err;
			res.json(docs);
		});
	});

	// POST Booking
	router.post('/booking', function(req, res){
		var date = moment(req.body.order.booking_date).format("MM/D/YYYY");
		console.log(req.body);
		BookingList.create({
			'customer_name' : req.body.customer_name,
			'customer_mobile' : req.body.customer_mobile,
			'customer_email' : req.body.customer_email,
			'customer_address' : req.body.customer_address,
			'area_name' : req.body.area_name,
			'city_name' : req.body.city_name,
			'customer_landmark' : req.body.customer_landmark,
			'order' : {
				'area_name' : req.body.order.area_name,
				'service_name' : req.body.order.service_name,
				'specifications' : req.body.order.specifications,
				'employee' : req.body.order.employee,
				'booking_date' : date,
				'booking_time' : req.body.order.booking_time,
				'payment_type' : req.body.order.payment_type
			}
		}, function(err, docs){
			res.json(docs);
		});
	});



};