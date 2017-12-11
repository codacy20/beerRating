var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var BeerSchema = mongoose.Schema({
name: {
	type: String,
	index:true
},
rate: {
	type: Number
}
});

var Beer = module.exports = mongoose.model('Beer', BeerSchema);

module.exports.createBeer = function(newBeer, callback){

	newBeer.save(callback);
}

module.exports.getBeer = function(name, callback){
var query = {name: name};
Beer.findOne(query, callback);
}

module.exports.getBeerById = function(id, callback){
Beer.findById(id, callback);
}
