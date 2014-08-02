// /*
//   user.js
//   unit tests for User model

//   Revision history
//   Hemanth Kona, 2014.06.19: created

// */

// var should = require('should'); 
// var assert = require('assert'); 
// var mongoose = require('mongoose');
// var User = require('../lib/models/user.js') 

// describe('User', function() {
//   var user;
//   before(function(done) {
//     user = new User({
//       email: 'dirty@mail.com',
//       password: 'do',
//       firstname: 'Hem',
//       lastname: 'Ko'
//     });
//     done();
//   });

//   it('should have email', function() {
//     user.should.have.property('email');
//   });

//   it('should have password', function() {
//     user.should.have.property('password');
//   });

//   it('should have firstname', function() {
//     user.should.have.property('firstname');
//   });

//   it('should have lastname', function() {
//     user.should.have.property('lastname');
//   });  

//   it('should have createdOn', function() {
//     user.should.have.property('createdOn');
//   })
//   it('should have empty projects array', function() {
//     user.should.have.property('projects');
//   });


// });