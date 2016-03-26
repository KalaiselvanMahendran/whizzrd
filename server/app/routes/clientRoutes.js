module.exports = function(router){

	router.get('/client', function(req, res) {
		res.render('secured/client', {user: req.user});
	});


};