/*
	login.js
	Login controller

	Revision history
	Pranav Maharaj, 2014.06.20: created
*/

app.controller('LoginController', [ '$scope', 'Auth', '$modal', 
	function($scope, Auth, $modal) {
		$scope.email = "Hello"

		$scope.login = function() {
			
			$scope.formErrors = [];

 		if($scope.email == undefined) {
 			$scope.formErrors.push('Email');
 		}

 		if($scope.password == undefined) {
 			$scope.formErrors.push("Password");
 		}

 		if($scope.formErrors.length != 0) {
				
				// Concatenating all the data in the array to form a string, that string is sent to content in $modal
				$scope.AllErrors = $scope.formErrors.join(', <br>')

				// Pop up or Modal to show the error list
				$modal({
					title: "Error: Missing Input Data",
					backdrop: false,
					html: true,
					content: $scope.AllErrors
				});

				return;
		}

			Auth.login({
				email: $scope.email,
				password: $scope.password
			});
	};
}]);
