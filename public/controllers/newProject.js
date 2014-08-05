/* 
	project.js
	Create new project 

	Revision history
	Pranav Maharaj, 2014.06.23: created
	Hemanth Kona, 2014.08.02; fixed design grade visual error
 */

app.controller('NewProjectController', [ 'Project', 'geolocation', '$scope', '$location', '$rootScope', '$alert', 
	function (Project, geolocation, $scope, $location, $rootScope, $alert) {
	
		$rootScope.pageTitle = "New Project";
		
		$scope.parent = "form";

		$scope.formData = {};
 			
 			
		$scope.processForm = function() {
			console.log('Construction data genereated');

			// Input Design Data
			
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
			
			//Output Construction Data
			
			$scope.estimatedFaultCurrent = $scope.CalculateEstimatedFaultCurrent().toFixed(3);
			$scope.designFaultCurrent = $scope.CalculateDesignFaultCurrent().toFixed(3);
			
			$scope.conductorLength = $scope.CalculateConductorLength().toFixed(3);
			$scope.earthMatResistance = $scope.CalculateEarthMatResistance().toFixed(3);
			$scope.gridConductorLength = $scope.CalculateGridConductorLength().toFixed(3);
			$scope.minEarthRodsNumber = $scope.CalculateMinEarthRodsNumber().toFixed(3);
			$scope.increasedEarthRodsNumber = $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
			$scope.comments = "Increased rod amount by 10% to: " + $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
			
			$scope.newGridConductorLength = parseFloat($scope.increasedEarthRodsNumber * $scope.earthRodLength).toFixed(3);
			$scope.totalLengthOfCopper = parseFloat($scope.gridConductorLength) + parseFloat($scope.newGridConductorLength);
			$scope.maxStepVoltage = $scope.CalculateMaximumStepVoltage().toFixed(3);
			$scope.tolerableStepVoltage = $scope.CalculateTolerableStepVoltage().toFixed(3);
		
			$scope.designGrade ="";
			$scope.recommendation = "";
			$scope.CompareMaxWithTolerableStepVoltage();
			
			$scope.maxGridPotentialRise = $scope.CalculateMaxGridPotentialRise().toFixed(3);
			$scope.totalVoltage = parseFloat($scope.maxStepVoltage) + parseFloat($scope.tolerableStepVoltage);
			
			$scope.maxStepVoltagePercent = (($scope.maxStepVoltage / $scope.totalVoltage) * 100).toFixed(0);
			
			$scope.tolerableStepVoltagePercent = (($scope.tolerableStepVoltage / $scope.totalVoltage) * 100).toFixed(0);

			// Converting to form data for convenience 
			//Eliminating past redundancy and overcalculations with more sources of error - pranav

			$scope.formData.estimatedFaultCurrent = $scope.estimatedFaultCurrent;
			$scope.formData.designFaultCurrent = $scope.designFaultCurrent;
			
			$scope.formData.conductorLength = $scope.conductorLength;
			$scope.formData.earthMatResistance = $scope.earthMatResistance;
			$scope.formData.gridConductorLength = $scope.gridConductorLength;
			$scope.formData.minEarthRodsNumber = $scope.minEarthRodsNumber ;
			$scope.formData.increasedEarthRodsNumber = $scope.increasedEarthRodsNumber;
			$scope.formData.comments = $scope.comments
			
			$scope.formData.newGridConductorLength = $scope.newGridConductorLength;
			$scope.formData.totalLengthOfCopper = $scope.totalLengthOfCopper;
			$scope.formData.maxStepVoltage = $scope.maxStepVoltage;
			$scope.formData.tolerableStepVoltage = $scope.tolerableStepVoltage;
		
			
		
			
			$scope.formData.designGrade =$scope.designGrade;
			$scope.formData.recommendation= $scope.recommendation;
			//$scope.CompareMaxWithTolerableStepVoltage(); ALREADY DONE ABOVE

			$scope.formData.maxGridPotentialRise = $scope.maxGridPotentialRise;
			$scope.formData.totalVoltage = $scope.totalVoltage;
			
			$scope.formData.maxStepVoltagePercent = $scope.maxStepVoltagePercent;
			$scope.formData.tolerableStepVoltagePercent = $scope.tolerableStepVoltagePercent;


			
			$location.path('/form/designGrade');
		}
		
	//Comparing max step voltage and tolerable step voltage
	$scope.CompareMaxWithTolerableStepVoltage = function()
	{
		if(($scope.maxStepVoltage <= $scope.tolerableStepVoltage)&&($scope.maxStepVoltage > 0) && ($scope.minEarthRodsNumber > 0))
		{
			$scope.designGrade = "Good";			
			$scope.formData.designGrade = "Good";		
			
			$scope.comments = "Max Step < Tolerable Step Voltage. \n" + $scope.comments ;	
			$scope.formData.comments = $scope.comments ;
				
				
			$scope.recommendation = "None";
			$scope.formData.recommendation = "None";
		}
		else if (($scope.maxStepVoltage > $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber > 0))
		{
			//one for back end one for front end
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
		
			$scope.comments = "Max Step > Tolerable Step Voltage. ";
			$scope.formData.comments = $scope.comments ;
			
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage <= $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber < 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
			
			$scope.comments = "Calculated # of rods is negative. " ;
			$scope.formData.comments = $scope.comments ;
			
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage > $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber > 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step > Tolerable Step Voltage. " + '\n' +
				"Calculated # of rods is negative";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage < 0) && ($scope.minEarthRodsNumber > 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step Voltage is Negative. ";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage < 0 ) && ($scope.minEarthRodsNumber < 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step Voltage is Negative. " + '\n' +
				"Calculated # of rods is negative";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		
		
	}
	
	//Estimated Fault Current
	$scope.CalculateEstimatedFaultCurrent = function()
	{
		return ((3*($scope.lineVoltage/Math.sqrt(3)))/($scope.impedanceOne + $scope.impedanceTwo + $scope.impedanceThree));
	}
	
	//Design Fault Current
	$scope.CalculateDesignFaultCurrent = function()
	{
		return ($scope.estimatedFaultCurrent * $scope.decrementFactor * $scope.growthFactor);
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
		return ($scope.averageResistivity * ((1/(4 * $scope.CalculateRadius())) + (1/$scope.conductorLength)));
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
		return ($scope.geometricSpacingFactor * $scope.irregularityFactor * $scope.averageResistivity * ($scope.designFaultCurrent / $scope.totalLengthOfCopper));
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

	$scope.createProject = function() {
		
		// $scope.latitude = $scope.coords.latitude || 0;
		// $scope.longitude = $scope.coords.longitude || 0;

		Project.save({
    
	    name: $scope.formData.projectName || new Date().toUTCString(), // ideally the default should be something with a date/time stamp
	    
	    latitude: $scope.latitude,
	    longitude: $scope.longitude, 

	    lineVoltage: $scope.lineVoltage,
	    impedanceOne: $scope.impedanceOne,
	    impedanceTwo: $scope.impedanceTwo,
	    impedanceThree: $scope.impedanceThree,
	    
	    decrementFactor: $scope.decrementFactor,
	    growthFactor: $scope.growthFactor,
	    physicalGridCoefficient: $scope.physicalGridCoefficient,
	    irregularityFactor: $scope.irregularityFactor,
	    
	    averageResistivity: $scope.averageResistivity,
	    immediateResistivity: $scope.immediateResistivity,
	    clearingTime: $scope.clearingTime,
	    substationLength: $scope.substationLength,
	    substationWidth: $scope.substationWidth,
	    widthSpacing: $scope.widthSpacing,
	    lengthSpacing: $scope.lengthSpacing,
	    earthRodLength: $scope.earthRodLength,
	    geometricSpacingFactor: $scope.geometricSpacingFactor,
	    
	    estimatedFaultCurrent: $scope.estimatedFaultCurrent,
	    designFaultCurrent: $scope.designFaultCurrent,
	    conductorLength: $scope.conductorLength,
	    earthMatResistance: $scope.earthMatResistance,
	    gridConductorLength: $scope.gridConductorLength,
	    minEarthRodsNumber: $scope.minEarthRodsNumber,
	    increasedEarthRodsNumber: $scope.increasedEarthRodsNumber,
	    newGridConductorLength: $scope.newGridConductorLength,
	    totalLengthOfCopper: $scope.totalLengthOfCopper,
	    maxStepVoltage: $scope.maxStepVoltage,
	    tolerableStepVoltage: $scope.tolerableStepVoltage,
	    designGrade: $scope.designGrade,
	    maxGridPotentialRise: $scope.maxGridPotentialRise,
	    recommendation: $scope.recommendation,
	    comments: $scope.comments,
		
		//visual analytics
		totalVoltage: $scope.totalVoltage,
		maxStepVoltagePercent: $scope.maxStepVoltagePercent,
		tolerableStepVoltagePercent: $scope.tolerableStepVoltagePercent,
	
		
		
	  }, 
		function() {
			console.log("Created Project");
			$alert({
        title: 'Success!',
        content: 'Project saved.',
        placement: 'top-right',
        type: 'success',
        duration: 3
      });
		},
		function(response) {
			console.log(response);
			$alert({
        title: 'Error!',
        content: response.data.message,
        placement: 'top-right',
        type: 'danger',
        duration: 5  
      });
	  });
	};



	$scope.getCurrentGeoLocation = function() {
		console.log("Geoloaction")
		geolocation.getLocation().then(function(data){
      //$scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
    	$scope.formData.latitude = data.coords.latitude;
		$scope.latitude = data.coords.latitude;
		
    	$scope.formData.longitude = data.coords.longitude;
		$scope.longitude = data.coords.longitude;

    	$alert({
    		title: 'Success!',
        content: 'Location added.',
        placement: 'top-right',
        type: 'success',
        duration: 3
    	})

    });
	}

}]);