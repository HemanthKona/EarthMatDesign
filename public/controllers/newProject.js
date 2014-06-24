/* 
	project.js
	Create new project 

	Revision history
	Pranav Maharaj, 2014.06.23: created
 */
 app.controller('NewProjectController', ['$scope', 
 		function ($scope) {
			//Input Design Data
			$scope.lineVoltage = 1;
			$scope.impedanceOne = 1;
			$scope.impedanceTwo = 1;
			$scope.impedanceThree	= 1;
			
			$scope.decrementFactor = 1;
			$scope.growthFactor = 1;
			$scope.physicalGridCoefficient = 1;
			$scope.irregularityFactor = 1;
			
			$scope.averageResistivity = 1;
			$scope.immediateResistivity = 1;
			$scope.clearingTime = 1;
			$scope.substationLength = 1;
			$scope.substationWidth = 1;
			$scope.widthSpacing = 1;
			$scope.lengthSpacing = 1;
			$scope.earthRodLength = 1;
			$scope.geometricSpacingFactor = 1;
		$scope.generateConstructionData = function() {
			//Output Construction Data
			$scope.estimatedFaultCurrent = $scope.CalculateEstimatedFaultCurrent().toFixed(3);
			$scope.designFaultCurrent = $scope.CalculateDesignFaultCurrent().toFixed(3);
			
			$scope.conductorLength = $scope.CalculateConductorLength().toFixed(3);
			//$scope.earthMatResistance = $scope.CalculateEarthMatResistance().toFixed(3);
			$scope.gridConductorLength = $scope.CalculateGridConductorLength().toFixed(3);
			$scope.minEarthRodsNumber = $scope.CalculateMinEarthRodsNumber().toFixed(3);
			// $scope.increasedEarthRodsNumber = $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
			// $scope.recommendation = "Increase rods by 10% to: " + $scope.CalculateIncreasedRodsNumber().toFixed(3);
			
			// $scope.newGridConductorLength = $scope.increasedEarthRodsNumber * $scope.earthRodLength;
			// $scope.totalLengthOfCopper = $scope.gridConductorLength + $scope.newGridConductorLength;
			// $scope.maxStepVoltage = $scope.CalculateMaximumStepVoltage().toFixed(3);
			// $scope.tolerableStepVoltage = $scope.CalculateTolerableStepVoltage().toFixed(3);
			
			// $scope.designGrade ="";
			// $scope.comments = "";
			// CompareMaxWithTolerableStepVoltage();
			
			// $scope.maxGridPotentialRise = $scope.CalculateMaxGridPotentialRise().toFixed(3);
		}
		
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
	$scope.CalculateDesignFaultCurrent = function()
	{
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
		return $scope.sverageResistivity * ((1/(4)) + (1/$scope.conductorLength));
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
	$scope.CalculateIncreasedNumberEarthRods = function()
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
	$scope.CalculateMaximumGridPotentialRise = function()
	{
		return $scope.designFaultCurrent * $scope.earthMatResistance;
	}
}]);