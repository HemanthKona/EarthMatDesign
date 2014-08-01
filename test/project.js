var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var Project = require('../lib/models/project.js') 

describe('Project', function() {

	var project;
  before(function(done) {
    project = new Project({
      name: 1 || "New Project 1", // ideally the default should be something with a date/time stamp
	    
	    latitude: 1,
	    longitude: 1, 

	    lineVoltage: 1,
	    impedanceOne: 1,
	    impedanceTwo: 1,
	    impedanceThree: 1,
	    
	    decrementFactor: 1,
	    growthFactor: 1,
	    physicalGridCoefficient: 1,
	    irregularityFactor: 1,
	    
	    averageResistivity: 1,
	    immediateResistivity: 1,
	    clearingTime: 1,
	    substationLength: 1,
	    substationWidth: 1,
	    widthSpacing: 1,
	    lengthSpacing: 1,
	    earthRodLength: 1,
	    geometricSpacingFactor: 1,
	    
	    estimatedFaultCurrent: 1,
	    designFaultCurrent: 1,
	    conductorLength: 1,
	    earthMatResistance: 1,
	    gridConductorLength: 1,
	    minEarthRodsNumber: 1,
	    increasedEarthRodsNumber: 1,
	    newGridConductorLength: 1,
	    totalLengthOfCopper: 1,
	    maxStepVoltage: 1,
	    tolerableStepVoltage: 1,
	    designGrade: 1,
	    maxGridPotentialRise: 1,
	    recommendation: 1,
	    comments: 1,
    });
    done();
  });

	it('should have project name', function() {
    project.should.have.property('name');
  });

	it('should have lineVoltage', function() {
    project.data.design.should.have.property('lineVoltage');
  });

	it('should have impedanceOne', function() {
    project.data.design.should.have.property('impedanceOne');
  });

	it('should have impedanceTwo', function() {
    project.data.design.should.have.property('impedanceTwo');
  });

	it('should have impedanceThree', function() {
    project.data.design.should.have.property('impedanceThree');
  });

	it('should have decrementFactor', function() {
    project.data.design.should.have.property('decrementFactor');
  });

	it('should have growthFactor', function() {
    project.data.design.should.have.property('growthFactor');
  });

	it('should have physicalGridCoefficient', function() {
    project.data.design.should.have.property('physicalGridCoefficient');
  });

	it('should have irregularityFactor', function() {
    project.data.design.should.have.property('irregularityFactor');
  });

	it('should have averageResistivity', function() {
    project.data.design.should.have.property('averageResistivity');
  });

	it('should have immediateResistivity', function() {
    project.data.design.should.have.property('immediateResistivity');
  });

	it('should have clearingTime', function() {
    project.data.design.should.have.property('clearingTime');
  });

	it('should have substationLength', function() {
    project.data.design.should.have.property('substationLength');
  });

	it('should have widthSpacing', function() {
    project.data.design.should.have.property('widthSpacing');
  });

	it('should have lengthSpacing', function() {
    project.data.design.should.have.property('lengthSpacing');
  });

	it('should have earthRodLength', function() {
    project.data.design.should.have.property('earthRodLength');
  });

	it('should have geometricSpacingFactor', function() {
    project.data.design.should.have.property('geometricSpacingFactor');
  });

	it('should have estimatedFaultCurrent', function() {
    project.data.construction.should.have.property('estimatedFaultCurrent');
  });

	it('should have designFaultCurrent', function() {
    project.data.construction.should.have.property('designFaultCurrent');
  });

	it('should have conductorLength', function() {
    project.data.construction.should.have.property('conductorLength');
  });

	it('should have earthMatResistance', function() {
    project.data.construction.should.have.property('earthMatResistance');
  });

	it('should have gridConductorLength', function() {
    project.data.construction.should.have.property('gridConductorLength');
  });

	it('should have minEarthRodsNumber', function() {
    project.data.construction.should.have.property('minEarthRodsNumber');
  });

	it('should have increasedEarthRodsNumber', function() {
    project.data.construction.should.have.property('increasedEarthRodsNumber');
  });

	it('should have newGridConductorLength', function() {
    project.data.construction.should.have.property('newGridConductorLength');
  });

	it('should have totalLengthOfCopper', function() {
    project.data.construction.should.have.property('totalLengthOfCopper');
  });

	it('should have maxStepVoltage', function() {
    project.data.construction.should.have.property('maxStepVoltage');
  });

	it('should have tolerableStepVoltage', function() {
    project.data.construction.should.have.property('tolerableStepVoltage');
  });

	it('should have designGrade', function() {
    project.data.construction.should.have.property('designGrade');
  });

	it('should have maxGridPotentialRise', function() {
    project.data.construction.should.have.property('maxGridPotentialRise');
  });

	it('should have recommendation', function() {
    project.data.construction.should.have.property('recommendation');
  });

	it('should have comments', function() {
    project.data.construction.should.have.property('comments');
  });

});

