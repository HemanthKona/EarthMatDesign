/*
  server.js
  Starting point of the node.js server appliction

  Revision history
  Hemanth Kona, 2014.06.19: created
  Hemanth Kona, 2014.06.20: Connection to mongodb database is established using mongoose 
  Hemanth Kona, 2014.06.20: Defined User and Project schemas 
  Hemanth Kona, 2014.06.22: User authentication implemented using passport 
*/

// import required modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Initiating express server
var app = express();

// Authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.send(401);
}

// User authentication using passport
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Authenticate using passport local strategy i.e. using email and password
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));

/* Define databse schema */

// User collection schema
var userSchema = new mongoose.Schema({
  name: {first: String, last: String},
  email: { type: String, unique: true },
  password: String
});

// Project collection schema
var projectSchema = new mongoose.Schema({
  name:  String,
  data: {
    design: {

    }
    construction: {

    },     
  }
});

// Encrypt pasword before saving
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Compare passwords
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
var Project = mongoose.model('Project', projectSchema);

//mongoose.connect('localhost/emd');
mongoose.connect('mongodb://admin:doit@kahana.mongohq.com:10078/emd')

// Define middleware
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'Authentic' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});

// Login route
app.post('/api/login', passport.authenticate('local'), function(req, res) {
  res.cookie('user', JSON.stringify(req.user));
  res.send(req.user);
});

// Signup route
app.post('/api/signup', function(req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    if (err) return next(err);
    res.send(200);
  });
});

// Logout route
app.get('/api/logout', function(req, res, next) {
  req.logout();
  res.send(200);
});

// redirect every other which is not defined route
app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Error handling 
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

//Listen on port 1000
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});