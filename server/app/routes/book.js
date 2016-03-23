var BookingList = require('../models/booking');
var moment = require('moment');

module.exports = function(router, msg91){

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
			'otp' : req.body.otp,
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

	// Verify user phone number (Main Source) while Registration
	router.post('/verification/:mobile', function(req, res){
		var mobile_no = req.params.mobile;
		var message = 'Whizzrd One Time Password : ' + Math.floor(1000 + Math.random() * 9000);
		msg91.send(mobile_no, message, function(err, response){
			if(err)
				throw err;
			res.json(message.replace('Hapserve One Time Password : ',''));
		});
	});

	// One Time Password while Login
	router.post('/loginOtp', function(req, res){
		console.log(req.body.mobile_no);
		var mobileNo = req.body.mobile_no;
		var newOtp = Math.floor(1000 + Math.random() * 9000);
		var message = 'Whizzrd One Time Password : ' + newOtp;
		BookingList.find({customer_mobile:mobileNo}, function(err, docs){
			if(docs.length)
			{
				var current_otp = newOtp;
				msg91.send(mobileNo, message, function(err, response){
					if(err)
						throw err;
					var current_otp = newOtp;
					// updating Register data using phone no
					BookingList.update({customer_mobile:mobileNo}, {$set : {otp : current_otp}}, {upsert: true}, function(err, docs){
						res.json(docs);
					});
				});
			}
			else
			{
				console.log('Unknown mobile number');
				msg91.send(mobileNo, 'Thank you for Visiting Whizzrd.com, You Need to Register First', function(err, response){
					if(err)
						throw err;
					console.log(response);
				});
			}

		});

	});



};