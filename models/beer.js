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

	var query = Beer.findOne({'name':newBeer.name});
	query.exec(function(err,result){
		if(err) return handleError(err);
		if(result){
			//to:do
			console.log('this is the result: '+result.rate);
			result.rate += newBeer.rate;
			result.save(callback);
		}
		if(!result){

			newBeer.save(callback);
		}
	});
}

module.exports.getBeer = function(name, callback){
	var query = {name: name};
	Beer.findOne(query, callback);
}

module.exports.ShowAllBeers = function(callback){
	Beer.find().sort({'rate': -1}).limit(4).exec(function(err, beers) {
		if(err == null)
		{
			callback(beers);
		}
		else {
			callback(err);
		}
	});
}

module.exports.getBeerById = function(id, callback){
Beer.findById(id, callback);
}
