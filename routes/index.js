var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Beer = require('../models/beer');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	var a = User.ShowHisBeers(req.user.beers);
	Beer.ShowAllBeers(function(callback) {
			res.render('index',{beers:a,beers2:callback});
	});

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
