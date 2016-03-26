var EmployeeList = require('../models/employee');

module.exports = function(router, passport) {

    // Authenticate
    router.get('/login', function(req, res) {
        res.render('auth/employee-login', { message: req.flash('loginMessage') });
    });

    router.get('/myprofile', function(req, res) {
        res.render('serviceProviders/myProfile', { user: req.user });
    });

    router.post('/employee-login', passport.authenticate('employee-login', {
        successRedirect: '/serviceProviders/myprofile',
        failureRedirect: '/serviceProviders/login',
        failureFlash: true
    }));

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/serviceProviders/login');
    });
    // end of Authenticate

  	router.get('/myOrders', function(req, res){
  		res.render('serviceProviders/myOrders', {user: req.user});
  	});



};
