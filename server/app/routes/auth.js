var User = require('../models/user');

module.exports = function(router, passport){

	// rendering login page
	router.get('/login', function(req, res){
		res.render('auth/login', {message: req.flash('loginMessage')});
	});

	// rendering signup page
	router.get('/signup', function(req, res){
		res.render('auth/signup', {message: req.flash('signupMessage')});
	});

	// signup authentication
	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/auth/login',
		successFlash : true,
		failureRedirect: '/auth/signup',
		failureFlash: true
	}));

	// login authentication
	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/secure/index',
		failureRedirect: '/auth/login',
		failureFlash: true
	}));

	// logout function
	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/auth/login');
	});

};