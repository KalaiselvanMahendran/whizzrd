var ServicesList = require('../models/services');

module.exports = function(router){
    
   // GET SERVICE
	router.get('/authenticate/mainserviceslist', function(req, res){
		ServicesList.find(function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE SERVICE
	router.get('/serviceslist/:id', function(req, res){
		var id = req.params.id;
		ServicesList.findOne({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// POST SERVICE
	router.post('/mainserviceslist', function(req, res){
		ServicesList.create(req.body, function(err, docs){
			res.json(docs);
		});
	});

	// DELETE SERVICE
	router.delete('/mainserviceslist/:id', function(req, res){
		var id = req.params.id;
		ServicesList.remove({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// UPDATE SERVICE
	router.put('/serviceslist/:id', function(req, res){
		var id = req.params.id;
		ServicesList.update({_id:id}, {$set : {service_name : req.body.service_name, specifications : req.body.specifications, city_name : req.body.city_name, area_name : req.body.area_name}}, {upsert: true}, function(err, docs){
			res.json(docs);
		});
	});

	// GET AREA BY CITY
	router.get('/authenticate/mainserviceslist/area/:id', function(req, res){
		var id = req.params.id;
		ServicesList.find({city_name:id}, function(err, docs){
			res.json(docs);
		});
	});

	// GET SERVICE BY AREA
	router.get('/authenticate/mainserviceslist/service/:id', function(req, res){
		var id = req.params.id;
		ServicesList.find({area_name:id}, function(err, docs){
			res.json(docs);
		});
	});

	// GET SPECIFICATIONS BY SERVICE
	router.get('/authenticate/mainserviceslist/specifications/:area/:service', function(req, res){
		var area = req.params.area;
		var service = req.params.service;
		ServicesList.find({ $and : [{area_name:area}, {service_name:service}]}, function(err, docs){
			res.json(docs);
		});
	});
	
};