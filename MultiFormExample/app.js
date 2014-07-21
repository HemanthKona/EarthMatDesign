
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.electrical', {
            url: '/electrical',
            templateUrl: 'form-electrical.html'
        })
        
        // url will be /form/physical
        .state('form.physical', {
            url: '/physical',
            templateUrl: 'form-physical.html'
        })
		
		// url will be /form/coefficients
        .state('form.coefficients', {
            url: '/coefficients',
            templateUrl: 'form-coefficients.html'
        })
        
        // url will be /form/factors
        .state('form.factors', {
            url: '/factors',
            templateUrl: 'form-factors.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/electrical');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    $scope.lineVoltage = parseFloat($scope.formData.lineVoltage);
    
    $scope.impedanceOne = parseFloat($scope.formData.impedanceOne);
    $scope.impedanceTwo = parseFloat($scope.formData.impedanceTwo);
    $scope.impedanceThree   = parseFloat($scope.formData.impedanceThree);
    
    $scope.decrementFactor = parseFloat($scope.formData.decrementFactor);
    $scope.growthFactor = parseFloat($scope.formData.growthFactor);
    $scope.physicalGridCoefficient = parseFloat($scope.formData.physicalGridCoefficient);
    $scope.irregularityFactor = parseFloat($scope.formData.irregularityFactor);
    
    $scope.averageResistivity = parseFloat($scope.formData.averageResistivity);
    $scope.immediateResistivity = parseFloat($scope.formData.immediateResistivity);
    $scope.clearingTime = parseFloat($scope.formData.clearingTime);
    $scope.substationLength = parseFloat($scope.formData.substationLength);
    $scope.substationWidth = parseFloat($scope.formData.substationWidth);
    $scope.widthSpacing = parseFloat($scope.formData.widthSpacing);
    $scope.lengthSpacing = parseFloat($scope.formData.lengthSpacing);
    $scope.earthRodLength = parseFloat($scope.formData.earthRodLength);
    $scope.geometricSpacingFactor = parseFloat($scope.formData.geometricSpacingFactor);


    // function to process the form
    $scope.processForm = function() {

				
		//Output Construction Data
        $scope.estimatedFaultCurrent = $scope.CalculateEstimatedFaultCurrent().toFixed(3);
    /*  $scope.designFaultCurrent = $scope.CalculateDesignFaultCurrent().toFixed(3);
        
        $scope.conductorLength = $scope.CalculateConductorLength().toFixed(3);
        $scope.earthMatResistance = $scope.CalculateEarthMatResistance().toFixed(3);
        $scope.gridConductorLength = $scope.CalculateGridConductorLength().toFixed(3);
        $scope.minEarthRodsNumber = $scope.CalculateMinEarthRodsNumber().toFixed(3);
        $scope.increasedEarthRodsNumber = $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
        $scope.recommendation = "Increase rods by 10% to: " + $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
        
        $scope.newGridConductorLength = $scope.increasedEarthRodsNumber * $scope.earthRodLength;
        $scope.totalLengthOfCopper = +$scope.gridConductorLength + +$scope.newGridConductorLength;
        $scope.maxStepVoltage = $scope.CalculateMaximumStepVoltage().toFixed(3);
        $scope.tolerableStepVoltage = $scope.CalculateTolerableStepVoltage().toFixed(3);
        
        // $scope.designGrade ="";
        // $scope.comments = "";
        $scope.CompareMaxWithTolerableStepVoltage();

        
        $scope.maxGridPotentialRise = $scope.CalculateMaxGridPotentialRise().toFixed(3);
            */
        console.log(parseFloat($scope.lineVoltage));    
        console.log($scope.estimatedFaultCurrent);  
        console.log($scope.designFaultCurrent);
    };
		
	//Comparing max step voltage and tolerable step voltage
	$scope.CompareMaxWithTolerableStepVoltage = function()
	{
		if($scope.maxStepVoltage <= $scope.tolerableStepVoltage)
		{
			$scope.designGrade = "Good";			
			$scope.comments = "None";
		}
		else
		{
			$scope.designGrade = "Bad"; 
			$scope.comments = "Revise conductor-length input"; 
		}
		
	}
	
	//Estimated Fault Current
	$scope.CalculateEstimatedFaultCurrent = function()
	{
		return ((3*($scope.lineVoltage/Math.sqrt(3)))/($scope.impedanceOne + $scope.impedanceTwo + $scope.impedanceThree));
	}
	
	//Design Fault Current
	$scope.CalculateDesignFaultCurrent = function() 	{
		return $scope.estimatedFaultCurrent * $scope.decrementFactor * $scope.growthFactor;
	}
	
	//Conductor Length
	$scope.CalculateConductorLength = function()
	{
		return (($scope.physicalGridCoefficient * $scope.irregularityFactor * 
			$scope.averageResistivity * $scope.designFaultCurrent * 
			Math.sqrt($scope.clearingTime))/(116 + (0.17 * $scope.immediateResistivity)));
	}
	
	//Overall Radius from Substation Area Info
	$scope.CalculateRadius = function()
	{
		return Math.sqrt(($scope.substationLength * $scope.substationWidth)/(Math.PI));
	}
	
	//Earth Mat Resistance
	$scope.CalculateEarthMatResistance = function()
	{
		return $scope.averageResistivity * ((1/(4 * $scope.CalculateRadius())) + (1/$scope.conductorLength));
	}
	
	//Grid Conductor length
	$scope.CalculateGridConductorLength = function()
	{
		return ($scope.substationWidth
			* (($scope.substationLength / $scope.lengthSpacing) + 1))
			+ ($scope.substationLength * (($scope.substationWidth / $scope.widthSpacing) + 1));
	}
	
	//Minimum Required number of Earth Rods
	$scope.CalculateMinEarthRodsNumber = function()
	{
		return Math.round(($scope.conductorLength - $scope.gridConductorLength) / $scope.earthRodLength);
	}
	///////////////////////////////////////////////////////////////////////////////	
	//Method: Calculate earth rod increase
	$scope.CalculateIncreasedEarthRodsNumber = function()
	{
		return Math.round($scope.minEarthRodsNumber * 1.10);
	}
	
	//Method: Calculate maximum step voltage
	$scope.CalculateMaximumStepVoltage = function()
	{
		return $scope.geometricSpacingFactor * $scope.irregularityFactor * $scope.averageResistivity * ($scope.designFaultCurrent / $scope.totalLengthOfCopper);
	}
	
	//Method: Calculate tolerable step voltage
	$scope.CalculateTolerableStepVoltage = function()
	{
		return ((116 + (0.7 * $scope.immediateResistivity)) / (Math.sqrt($scope.clearingTime)));
	}
	
	//Method: Calculate maximum grid potential rise
	$scope.CalculateMaxGridPotentialRise = function()
	{
		return $scope.designFaultCurrent * $scope.earthMatResistance;
	}
    
});

