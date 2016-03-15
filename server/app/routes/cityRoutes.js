var CityList = require('../models/city');
var AreaList = require('../models/area');

module.exports = function(router){

	/************************* CITY ********************************************/

	// GET CITY
	router.get('/authenticate/citylist', function(req, res){
		CityList.find(function(err, docs){
			res.json(docs);
		});
	});

	// POST CITY
	router.post('/citylist', function(req, res){
		CityList.create(req.body, function(err, docs){
			res.json(docs);
		});
	});

	// DELETE CITY
	router.delete('/citylist/:id', function(req, res){
		var id = req.params.id;
		CityList.remove({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE CITY
	router.get('/citylist/:id', function(req, res){
		var id = req.params.id;
		CityList.findOne({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// UPDATE CITY
	router.put('/citylist/:id', function(req, res){
		var id = req.params.id;
		CityList.update({_id:id}, {$set : {state : req.body.state, city : req.body.city}}, {upsert: true}, function(err, docs){
			res.json(docs);
		});
	});

	/************************* End of CITY ********************************************/

	/************************* AREA ********************************************/

	// GET AREA
	router.get('/authenticate/arealist', function(req, res){
		AreaList.find(function(err, docs){
			res.json(docs);
		});
	});

	// POST AREA
	router.post('/arealist', function(req, res){
		AreaList.create(req.body, function(err, docs){
			res.json(docs);
		});
	});

	// DELETE AREA
	router.delete('/arealist/:id', function(req, res){
		var id = req.params.id;
		AreaList.remove({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE AREA
	router.get('/arealist/:id', function(req, res){
		var id = req.params.id;
		AreaList.findOne({_id:id}, function(err, docs){
			res.json(docs);
		});
	});

	// FINDONE AREA by CITY NAME
	router.get('/authenticate/arealist/:id', function(req, res){
		var id = req.params.id;
		console.log(id);
		AreaList.find({city_name:id}, function(err, docs){
			res.json(docs);
			console.log(docs);
		});
	});

	// UPDATE AREA
	router.put('/arealist/:id', function(req, res){
		var id = req.params.id;
		AreaList.update({_id:id}, {$set : {city_name : req.body.city_name, area_name : req.body.area_name}}, {upsert: true}, function(err, docs){
			res.json(docs);
		});
	});

	/************************* End of AREA ********************************************/



};