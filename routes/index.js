var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	var b = User.ShowHisBeers(req.user.beers);
	res.render('index',{beers:b});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
