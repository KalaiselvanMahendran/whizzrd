var BookingList = require('../models/booking');
var moment = require('moment');

module.exports = function(router, passport){

	router.get('/login', function(req, res){
		res.render('auth/customer-login', { message: req.flash('loginMessage') });
	});

	router.post('/login', passport.authenticate('customer-login', {
		successRedirect: '/mybookings',
		failureRedirect: '/login',
		failureFlash: true
	}));

	router.get('/mybookings', function(req, res){
		res.render('client/myBookings', {user: req.user});
	});

	router.get('/profile', function(req, res){
		res.render('client/profile', {user: req.user});
	});

	router.get('/newBooking', function(req, res){
		res.render('client/newBooking', {user: req.user});
	});	

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});

	// Get Order List
	router.get('/authenticate/bookinglist/:id', function(req, res){
		var id = req.params.id;
		BookingList.findOne({_id:id}, function(err, docs){
			if(err)
				throw err;
			res.json(docs);
		});
	});

	// Get Profile Data
	router.get('/authenticate/bookinglist/profileData/:id', function(req, res){
		var id = req.params.id;
		BookingList.findOne({_id:id}, function(err, docs){
			if(err)
				throw err;
			res.json(docs);
		});
	});

	// Update Profile Data
	router.put('/authenticate/bookinglist/profileData/:id', function(req, res){
		var id = req.params.id;
		BookingList.update({_id:id}, {$set : {customer_name : req.body.customer_name, customer_mobile : req.body.customer_mobile, customer_email : req.body.customer_email, customer_address : req.body.customer_address, customer_landmark : req.body.customer_landmark}}, {upsert: true}, function(err, docs){
			res.json(docs);
		});
	});

	// New-Booking
	router.put('/client/newbooking/:id', function(req, res){
		var id = req.params.id;
		var date = moment(req.body.booking_date).format("MM-DD-YYYY");
		console.log(id);
		BookingList.update({_id:id}, {$push : 
			{ 
				'order' : {
					'service_name' : req.body.service_name,
					'area_name' : req.body.area_name,
					'employee' : req.body.employee, 
					'booking_date' : date, 
					'booking_time' : req.body.booking_time,
					'payment_type' : req.body.payment_type,
					'specifications' : req.body.specifications
					}	
				}
			}, {upsert: true}, function(err, docs){
			res.json(docs);
			console.log(docs);
		});
	});

};