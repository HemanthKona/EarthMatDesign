/*
  project.js
  Project databse schema

  Revision history,
  Hemanth Kona, 07.18.2014: created

*/

var mongoose = require('mongoose');

// Project collection schema
var projectSchema = new mongoose.Schema({
  name:  String, 
  createdBy: String,
  createdOn: {type: Date, default: Date.now},
  geolocation: {
    latitide: Number,
    longitude: Number
  },
  data: {
    design: {
      lineVoltage: Number,
      impedanceOne: Number,
      impedanceTwo: Number,
      impedanceThree: Number,
      
      decrementFactor: Number,
      growthFactor: Number,
      physicalGridCoefficient: Number,
      irregularityFactor: Number,
      
      averageResistivity: Number,
      immediateResistivity: Number,
      clearingTime: Number,
      substationLength: Number,
      substationWidth: Number,
      widthSpacing: Number,
      lengthSpacing: Number,
      earthRodLength: Number,
      geometricSpacingFactor: Number
    },
    construction: {
      estimatedFaultCurrent: Number,
      designFaultCurrent: Number,
      conductorLength: Number,
      earthMatResistance: Number,
      gridConductorLength: Number,
      minEarthRodsNumber: Number,
      increasedEarthRodsNumber: Number,
      newGridConductorLength: Number,
      totalLengthOfCopper: Number,
      maxStepVoltage: Number,
      tolerableStepVoltage: Number,
      maxGridPotentialRise: Number,
      designGrade: String,
      recommendation: String,
      comments: String,
    }     
  }
});

module.exports = mongoose.model('Project', projectSchema);
