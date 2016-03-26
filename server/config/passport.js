var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');
var BookingList = require('../app/models/booking');
var EmployeeList = require('../app/models/employee');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			if(err)
				done(err);
			if(user){
				done(null, user);
			}else{
				BookingList.findById(id, function(err, user){
					if(err)
						done(err);
					if(user){
						done(null, user);	
					}else{
						EmployeeList.findById(id, function(err, user){
							if(err)
								done(err);
							done(null, user);
						});
					}
				});
			}
		});
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	/* Admin Signup config */
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': username}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
					var newUser = new User();
					newUser.local.name = req.body.name;
					newUser.local.username = username;
					newUser.local.password = password;

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser, req.flash('signupMessage', 'You Account has been created Successfully'));
					});
				}
			});

		});
	}));

	/* Admin Login Config */
	passport.use('local-login', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username' : username}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No User Found'));
				if(user.local.password != password){
					return done(null, false, req.flash('loginMessage', 'Invalid password'));
				}
				return done(null, user);
			});
		});
	}));

	/* Customer Login Config */
	passport.use('customer-login', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			BookingList.findOne({'customer_mobile' : username}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No User Found'));
				if(user.otp != password)
					return done(null, false, req.flash('loginMessage', 'Invalid password'));
				return done(null, user);
			});
		});
	}));

	/* Employee Login Config */
	passport.use('employee-login', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			EmployeeList.findOne({'username' : username}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No User Found'));
				if(user.password != password)
					return done(null, false, req.flash('loginMessage', 'Invalid password'));
				return done(null, user);
			});
		});
	}));

};
