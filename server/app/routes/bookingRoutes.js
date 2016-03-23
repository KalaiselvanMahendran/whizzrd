var BookingList = require('../models/booking');
var ServicesList = require('../models/services');
var EmployeeList = require('../models/employee');
var moment = require('moment');

module.exports = function(router){

	// Get Booking List
	router.get('/authenticate/bookinglist', function(req, res){
		BookingList.find(function(err, docs){
			if(err)
				throw err;
			res.json(docs);
		});
	});

	// DELETE Booking
	router.delete('/bookinglist/:id', function(req, res){
		var id = req.params.id;
		BookingList.remove({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE CITY
	router.get('/bookinglist/:id', function(req, res){
		var id = req.params.id;
		BookingList.findOne({'order._id':id}, {'order.$':1}, function(err, docs){
			res.json(docs);
		});
	});

	// GET SPECIFICATIONS BY SERVICE
	router.get('/bookinglist/employee/:area/:service', function(req, res){
		var area = req.params.area;
		var service = req.params.service;
		EmployeeList.find({ $and : [{area_name:area}, {service_name:service}]}, function(err, docs){
			res.json(docs);
		});
	});

	router.get('/bookinglist/updatespecifications/:area/:service', function(req, res){
		var area = req.params.area;
		var service = req.params.service;
		ServicesList.find({ $and : [{area_name:area}, {service_name:service}]}, function(err, docs){
			res.json(docs);
		});
	});

	router.put('/bookinglist/:id', function(req, res){
		var id = req.params.id;
		var date = moment(req.body.booking_date).format("MM/D/YYYY");
		console.log(id);
		BookingList.update({'order._id':id}, {$set : 
			{ 
				'order.$.area_name' : req.body.area_name,
				'order.$.service_name' : req.body.service_name, 
				'order.$.employee' : req.body.employee,
				'order.$.booking_date' : date,
				'order.$.booking_time' : req.body.booking_time,
				'order.$.specifications' : req.body.specifications,
				'order.$.payment_type' : req.body.payment_type,
				'order.$.status' : req.body.status,
			}
		}, {upsert: true}, function(err, docs){
			res.json(docs);
			console.log(docs);
		});
	});


};