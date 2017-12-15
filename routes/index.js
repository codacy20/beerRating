var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	////////// User.ShowHisBeers(req.user);
	// var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  //
	// // Insert a row in the table at the last row
	// var newRow   = tableRef.insertRow(tableRef.rows.length);
  //
	// // Insert a cell in the row at index 0
	// var newCell  = newRow.insertCell(0);
  //
	// // Append a text node to the cell
	// var newText  = document.createTextNode('New row');
	// newCell.appendChild(newText);

	res.render('index');
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
