module.exports = function(router, passport){

	// rendering index page
	router.get('/index', isLoggedIn, function(req, res){
		res.render('index', {user : req.user});
	});

	// rendering venue page
	router.get('/venue', isLoggedIn, function(req, res){
		res.render('secured/venue', {user : req.user});
	});

	// rendering service page
	router.get('/service', isLoggedIn, function(req, res){
		res.render('secured/services/index', {user : req.user});
	});
	
	//rendering main services page
	router.get('/main-service', isLoggedIn, function(req, res){
		res.render('secured/services/main-services', {user : req.user});
	});



};

function isLoggedIn(req, res, next){
	console.log(req.session);
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/auth/login');
}