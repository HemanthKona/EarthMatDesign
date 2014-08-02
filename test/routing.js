var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var winston = require('winston');
var mongoose = require('mongoose');
 
describe('Routing', function() {
  var url = 'http://localhost:5000';
  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function(done) {
    // In our tests we use the test db
    //mongoose.connect('localhost/emd');	


    done();
  });

  // use describe to give a title to your test suite, in this case the tile is "User"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('User', function() {
    
    describe('Sign up', function() {
      
      // should return true when signup using non-existing email
      it('should return true when signup using non-existing email', function(done) {
        var user = {
          email: 'hem@mail.com',
          password: 'do',
          firstname: 'He',
          lastname: 'ko'
        };
      
        request(url)
        .post('/api/signup')
        .send(user)
        .expect(400)
          // end handles the response
        .end(function(err, res) {
            done(err);
          });
      });

      // should return error when signup using existing email
      it('should return error when signup using existing email', function(done) {
        var user = {
          email: 'hemanth@mail.com',
          password: 'doit',
          firstname: 'hemanth',
          lastname: 'kona'
        }
        
        request(url)
        .post('/api/signup')
        .send(user)
        .expect(500)
          // end handles the response
        .end(function(err, res) {
          done(err);
        });
      });

      // should return error when signup using existing email
      it('should return error when email is not provided', function(done) {
        var user = {
          password: 'doit',
          firstname: 'hemanth',
          lastname: 'kona'
        }
        
        request(url)
        .post('/api/signup')
        .send(user)
        .expect(500)
          // end handles the response
        .end(function(err, res) {
          done(err);
        });
      });

    });

    describe('Log in', function() {
      it('should return true trying to login with existing email and password', function(done) {
      var user = {
        email: 'hem@mail.com',
        password: 'do',
      };
      request(url)
      .post('/api/login')
      .send(user)
      .expect(200)
        // end handles the response
      .end(function(err, res) {
              if (err) {
                throw err;
              }
              // console.log(res.body);
              // this is should.js syntax, very clear
              res.body.should.have.property('_id');
              res.body.should.have.property('email');
              res.body.should.have.property('_id');
              done();
            });
      });
      
      // it('should correctly update an existing account', function(done){
      //  var body = {
      //    firstName: 'JP',
      //    lastName: 'Berd'
      //  };
      //  request(url)
      //    .put('/api/profiles/vgheri')
      //    .send(body)
      //    .expect('Content-Type', /json/)
      //    .expect(200) //Status code
      //    .end(function(err,res) {
      //      if (err) {
      //        throw err;
      //      }
      //      // Should.js fluent syntax applied
      //      res.body.should.have.property('_id');
      //                  res.body.firstName.should.equal('JP');
      //                  res.body.lastName.should.equal('Berd');                    
      //                  res.body.creationDate.should.not.equal(null);
      //      done();
      //    });
      //  });
    });

    describe("Profile", function() {
      
      var currentUser;

      beforeEach(function(done) {

        var user = {
          email: 'hem@mail.com',
          password: 'do',
        };

        request(url)
        .post('/api/login')
        .send(user)
        .end(function(err, res) {
          currentUser = res.body._id;
          done(err);
        });

        
      });


      it('should delete profile', function(done) {
         
        var user = {
          email: 'hem@mail.com',
          password: 'do',
        };

        request(url)
        .post('/api/login')
        .send(user)
        .end(function(err, res) {
          currentUser = res.body._id;

          request(url)
          .delete('/api/profile/currentUser')
          .expect(200)
            // end handles the response
          .end(function(err, res) {
            done(err);
          }); 
        });

      })
    })
   
  });
});