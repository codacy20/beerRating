var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  beers: {
    type: []
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getBeers = function(id, callback) {
  var User = getUserById(id, callback);
  return User.beers;
}

module.exports.addBeer = function(beer, user, callback) {

  var check = false;
  for (var i = 0; i < user.beers.length; i++) {

    if (beer.name === user.beers[i].name) {
      //to:Do//////
      check = true;
      break;
    }
  }
  if (!check) user.beers.push(beer);
  // console.log(user.beers);
  user.save();
  return check;
}

module.exports.ShowHisBeers = function(beers, callback) {

  beers.sort(compare);
  return beers;
}

function compare(a, b) {
  if (a.rate < b.rate)
    return 1;
  if (a.rate > b.rate)
    return -1;
  return 0;
}
