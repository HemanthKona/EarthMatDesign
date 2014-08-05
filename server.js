/*
  server.js
  Starting point of the node.js server appliction

  Revision history
  Hemanth Kona, 2014.06.19: created
  Hemanth Kona, 2014.06.20: connection to mongodb database is established using mongoose 
  Hemanth Kona, 2014.06.21: defined User schemas 
  Hemanth Kona, 2014.06.21: user authentication implemented using passport 
  Hemanth Kona, 2014.06.22: defined project schemas
  Hemanth Kona, 2014.06.23: project data persisted to mongodb 
  Hemanth Kona, 2014.06.23: defined create project route 
  Hemanth Kona, 2014.06.24: defined Show all projects route
  Hemanth Kona, 2014.06.25: defined edit project route

*/
require('newrelic');
// import required modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var Project = require('./lib/models/project.js');
var User = require('./lib/models/user.js');

var docs = require("express-mongoose-docs");

// Initiating express server
var app = express();

// Authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.send(401, { message: 'You are not logged in.'});
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

//mongoose.connect('localhost/emd');
//mongoose.connect('mongodb://admin:doit@kahana.mongohq.com:10078/emd')
mongoose.connect('mongodb://admin:doit@kahana.mongohq.com:10066/app27162449')

mongoose.connection.on('error', function() {
  console.error(' MongoDB Connection Error. Please make sure MongoDB is running.');
});

// Define middleware
app.set('port', process.env.PORT || 5000)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'Authentic' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

//app.use(express.static(path.join(__dirname, 'MultiFormExample')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Login route
app.post('/api/login', passport.authenticate('local'), function(req, res) {
  res.cookie('user', JSON.stringify(req.user));
  res.send(req.user);
});

// Logout route
app.get('/api/logout', function(req, res, next) {
  req.logout();
  res.send(200);
});

// Signup route
app.post('/api/signup', function(req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });
  user.save(function(err) {
    if (err) return next(err);
    res.send(200, "User created");
  });
});

app.put('/api/updatePassword', ensureAuthenticated, function (req, res, next) {
  var user = req.user;

  user.password = req.body.password;

  user.save(function(err) {
    if(err) return next(err);
    res.send(200, "Password updated");
  })
})

// Get user profile
app.get('/api/profile', ensureAuthenticated, function(req, res, next) {
  User.findOne({email: req.user.email}, function(err, user) {
    if(err) return next(err);
    res.send(200, user);
  })
})

//Edit profile
app.put('/api/profile', ensureAuthenticated, function(req, res, next) {
  
  var userProfile = {};
    
  //userProfile.email = req.user.email;

  if(req.body.firstname) userProfile.firstname = req.body.firstname;
  if(req.body.lastname) userProfile.lastname = req.body.lastname;

  
  User.findOneAndUpdate({email: req.user.email}, userProfile,  function(err, user) {
    if(err) return next(err);
    res.send(200, user);
  })
})

app.delete('/api/profile/:id', ensureAuthenticated, function(req, res, next) {
    
  console.log("Currecnt unser ID: " + req.params.id);

  User.remove({email: req.params.id}, function(err) {
    if(err) return next(err);
    res.send(200);
  })
})

// Retrieve all projects
app.get('/api/projects', ensureAuthenticated, function(req, res, next) {
  Project.find({createdBy: req.user.email}) 
  .sort('-createdOn')
  .exec(function(err, projects) {
    if(err) return next(err);
    if(projects.length === 0) res.send(200, 'No project found');
    res.send(200, projects);
  });
});

// To generate api documentation for exress-mongoose 
docs(app, mongoose);

// Create new project
app.post('/api/projects', ensureAuthenticated, function(req, res, next) {
  var user = req.user.email;

  var project = new Project({
    name: req.body.name,
    createdBy: user,
    geolocation: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    },
    data: {
      design: {
        lineVoltage: req.body.lineVoltage,
        impedanceOne: req.body.impedanceOne,
        impedanceTwo: req.body.impedanceTwo,
        impedanceThree: req.body.impedanceThree,
        
        decrementFactor: req.body.decrementFactor,
        growthFactor: req.body.growthFactor,
        physicalGridCoefficient: req.body.physicalGridCoefficient,
        irregularityFactor: req.body.irregularityFactor,
        
        averageResistivity: req.body.averageResistivity,
        immediateResistivity: req.body.immediateResistivity,
        clearingTime: req.body.clearingTime,
        substationLength: req.body.substationLength,
        substationWidth: req.body.substationWidth,
        widthSpacing: req.body.widthSpacing,
        lengthSpacing: req.body.lengthSpacing,
        earthRodLength: req.body.earthRodLength,
        geometricSpacingFactor: req.body.geometricSpacingFactor
      },
      construction: {
        estimatedFaultCurrent: req.body.estimatedFaultCurrent,
        designFaultCurrent: req.body.designFaultCurrent,
        conductorLength: req.body.conductorLength,
        earthMatResistance: req.body.earthMatResistance,
        gridConductorLength: req.body.gridConductorLength,
        minEarthRodsNumber: req.body.minEarthRodsNumber,
        increasedEarthRodsNumber: req.body.increasedEarthRodsNumber,
        newGridConductorLength: req.body.newGridConductorLength,
        totalLengthOfCopper: req.body.totalLengthOfCopper,
        maxStepVoltage: req.body.maxStepVoltage,
        tolerableStepVoltage: req.body.tolerableStepVoltage,
        designGrade: req.body.designGrade,
        maxGridPotentialRise: req.body.maxGridPotentialRise,
        recommendation: req.body.recommendation,
        comments: req.body.comments,

        totalVoltage: req.body.totalVoltage,
        maxStepVoltagePercent: req.body.maxStepVoltagePercent,
        tolerableStepVoltagePercent: req.body.tolerableStepVoltagePercent,
      }
    } 
  });
  
  project.save(function(err, project) {
    if (err) return next(err);
    User.findOne({email: user}, function(err, u) {
      if(err) return next(err);

      u.projects.push(project.id); 
      u.save();

      res.send(200, project);
    })    
  })
});

// To retrieve a single project detials
app.get('/api/projects/:id', ensureAuthenticated, function(req, res, next) {
  Project.findById(req.params.id, function(err, project) {
    if(err) return next(err);
    if(!project) res.send(404, { message: 'Project doesnt exist' });
    console.log('CalledMethod: ' + project);
    res.send(project);
  })
});

// To edit existing project
app.put('/api/projects/:id', ensureAuthenticated, function(req, res, next) {
  var user = req.user.email;

  var project = {
    name: req.body.projectName,
    createdBy: user,
    geolocation: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    },
    data: {
      design: {
        lineVoltage: req.body.lineVoltage,
        impedanceOne: req.body.impedanceOne,
        impedanceTwo: req.body.impedanceTwo,
        impedanceThree: req.body.impedanceThree,
        
        decrementFactor: req.body.decrementFactor,
        growthFactor: req.body.growthFactor,
        physicalGridCoefficient: req.body.physicalGridCoefficient,
        irregularityFactor: req.body.irregularityFactor,
        
        averageResistivity: req.body.averageResistivity,
        immediateResistivity: req.body.immediateResistivity,
        clearingTime: req.body.clearingTime,
        substationLength: req.body.substationLength,
        substationWidth: req.body.substationWidth,
        widthSpacing: req.body.widthSpacing,
        lengthSpacing: req.body.lengthSpacing,
        earthRodLength: req.body.earthRodLength,
        geometricSpacingFactor: req.body.geometricSpacingFactor
      },
      construction: {
        estimatedFaultCurrent: req.body.estimatedFaultCurrent,
        designFaultCurrent: req.body.designFaultCurrent,
        conductorLength: req.body.conductorLength,
        earthMatResistance: req.body.earthMatResistance,
        gridConductorLength: req.body.gridConductorLength,
        minEarthRodsNumber: req.body.minEarthRodsNumber,
        increasedEarthRodsNumber: req.body.increasedEarthRodsNumber,
        newGridConductorLength: req.body.newGridConductorLength,
        totalLengthOfCopper: req.body.totalLengthOfCopper,
        maxStepVoltage: req.body.maxStepVoltage,
        tolerableStepVoltage: req.body.tolerableStepVoltage,
        designGrade: req.body.designGrade,
        maxGridPotentialRise: req.body.maxGridPotentialRise,
        recommendation: req.body.recommendation,
        comments: req.body.comments,

        totalVoltage: req.body.totalVoltage,
        maxStepVoltagePercent: req.body.maxStepVoltagePercent,
        tolerableStepVoltagePercent: req.body.tolerableStepVoltagePercent,
      }
    } 
  };

  Project.findOneAndUpdate({_id: req.params.id}, project, function(err, project) {
    if(err) return next(err);
    res.send(project);
  })
});

// To delete existing project
app.delete('/api/projects/:id', ensureAuthenticated, function(req, res, next) {
  Project.remove({_id: req.params.id}, function(err) {
    if(err) return next(err);

    User.findOne({email: req.user.email}, function(err, user) {
      if(err) return next(err);

      var item = 'ObjectId("'+req.param.id+'")';
      user.projects.pop(item);
      user.save();
      
      res.send(200);
    })
    
  })
});

// redirect every other which is not defined route
app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Error handling 
app.use(function(err, req, res, next) {
  console.error(err.stack);
  //res.send(500, {message: "Internal server error, we are notified."});
  res.send(500, { message: err.message });
});


//Listen on port 1000
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});