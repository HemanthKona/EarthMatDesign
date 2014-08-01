/*
	user.js
	User database schema

	Revision history
	Hemanth Kona, 07.18.2014: created

*/
// User collection schema
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

//User Schema definiton
var userSchema = new mongoose.Schema({
  firstname: String, 
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  createdOn: {type: Date, default: Date.now},
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
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

module.exports = mongoose.model('User', userSchema);
