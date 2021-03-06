var ServicesList = require('../models/services');
var EmployeeList = require('../models/employee');

module.exports = function(router) {

    // GET Area BY Service
    router.get('/authenticate/serviceslist/service/:id', function(req, res) {
        var id = req.params.id;
        ServicesList.find({ service_name: id }, function(err, docs) {
            res.json(docs);
        });
    });

    // GET City BY Area
    router.get('/authenticate/serviceslist/area/:id', function(req, res) {
        var id = req.params.id;
        ServicesList.find({ area_name: id }, function(err, docs) {
            res.json(docs);
        });
    });

    // GET Employee BY SERVICE and AREA
    router.get('/authenticate/employeelist/employee/:area/:service/:status', function(req, res) {
        var area = req.params.area;
        var service = req.params.service;
        var status = req.params.status;
        console.log(area + "-------" + service);
        EmployeeList.find({ $and: [{ area_name: area }, { service_name: service }, { availabilty: status }] }, function(err, docs) {
            res.json(docs);
        });
    });

    // Get Employee List
    router.get('/authenticate/employeelist', function(req, res) {
        EmployeeList.find(function(err, docs) {
            if (err)
                throw err;
            res.json(docs);
        });
    });

    // POST Employee
    router.post('/employeelist', function(req, res) {
        console.log(req.body);
        EmployeeList.create(req.body, function(err, docs) {
            res.json(docs);
        });
    });

    // DELETE Employee
    router.delete('/employeelist/:id', function(req, res) {
        var id = req.params.id;
        EmployeeList.remove({ _id: id }, function(err, docs) {
            res.json(docs);
        });
    });

    // FINDONE Employee
    router.get('/employeelist/:id', function(req, res) {
        var id = req.params.id;
        EmployeeList.findOne({ _id: id }, function(err, docs) {
            res.json(docs);
        });
    });

    // UPDATE Employee
    router.put('/employeelist/:id', function(req, res) {
        var id = req.params.id;
        EmployeeList.update({ _id: id }, { $set: { name: req.body.name, service_name: req.body.service_name, email: req.body.email, mobile: req.body.mobile, address: req.body.address, area_name: req.body.area_name, city_name: req.body.city_name, availabilty: req.body.availabilty, username: req.body.username, password: req.body.password } }, { upsert: true }, function(err, docs) {
            res.json(docs);
        });
    });

};

/*

// POST Employee
	router.post('/employeelist', function(req, res){
		console.log(req.body);
		var username = req.body.username;
		EmployeeList.findOne({'username': username}, function(err, user){
			if(err)
				return done(err);
			if(user){
				return done(null, false, req.flash('signupMessage', 'This username already taken'));
			} else {
				EmployeeList.create(req.body, function(err, docs){
					res.json(docs);
				});
			}
		});
	});


*/
