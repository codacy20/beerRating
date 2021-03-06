var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Beer = require('../models/beer');

// Register
router.get('/register', function(req, res) {
  res.render('register');
});

// Login
router.get('/login', function(req, res) {
  res.render('login');
});

// Register User
router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

router.post('/addBeer',
  function(req, res) {
    var name = req.body.name;
    var rate = req.body.rate;
    var newBeer = new Beer({
      name: name,
      rate: rate
    });
    var u = req.user;
    var isAdded = User.addBeer(newBeer, u, function(err, newBeer) {
      if (err) throw err;
    });

    if(!isAdded)
    {
      Beer.createBeer(newBeer, function(err, newBeer) {
        if (err) throw err;
      });
      req.flash('success_msg', 'You\'ve just rated a beer! Cheers');
    }

    req.flash('error_msg', 'You\'ve already rated that beer');

    res.redirect('/');

  });

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User'
        });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

module.exports = router;
