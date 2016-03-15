var ServiceList = require('../models/service');
var ServicesList = require('../models/services');
var SpecificationList = require('../models/specifications');

module.exports = function(router){

	// GET SERVICE
	router.get('/authenticate/servicelist', function(req, res){
		ServiceList.find(function(err, docs){
			res.json(docs);
		});
	});

	// POST SERVICE
	router.post('/servicelist', function(req, res){
		ServiceList.create(req.body, function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE SERVICE
	router.get('/servicelist/:id', function(req, res){
		var id = req.params.id;
		ServiceList.findOne({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// DELETE SERVICE
	router.delete('/servicelist/:id', function(req, res){
		var id = req.params.id;
		ServiceList.remove({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// UPDATE SERVICE
	router.put('/servicelist/:id', function(req, res){
		var id = req.params.id;
		ServiceList.update({_id:id}, {$set : {service_name : req.body.service_name}}, {upsert: true}, function(err, docs){
			res.json(docs);
		});
	});

	// GET SPECIFICATION
	router.get('/authenticate/specificationlist', function(req, res){
		SpecificationList.find(function(err, docs){
			res.json(docs);
		});
	});

	// POST SERVICE
	router.post('/specificationlist', function(req, res){
		SpecificationList.create(req.body, function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE SPECIFICATION
	router.get('/specificationlist/:id', function(req, res){
		var id = req.params.id;
		SpecificationList.findOne({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// DELETE SPECIFICATION
	router.delete('/specificationlist/:id', function(req, res){
		var id = req.params.id;
		SpecificationList.remove({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// UPDATE SERVICE
	router.put('/specificationlist/:id', function(req, res){
		var id = req.params.id;
		SpecificationList.update({_id:id}, {$set : {specification_name : req.body.specification_name}}, {upsert: true}, function(err, docs){
			res.json(docs);
		});
	});
	
	// GET SERVICE
	router.get('/authenticate/mainserviceslist', function(req, res){
		ServicesList.find(function(err, docs){
			res.json(docs);
		});
	});

	// POST SERVICE
	router.post('/mainserviceslist', function(req, res){
		ServicesList.create(req.body, function(err, docs){
			res.json(docs);
		});
	});


};