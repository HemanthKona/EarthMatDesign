/* 
	signup.js
	Sign up controller

	Revision history
	Pranav Maharaj, 2014.06.20: created
 */

 app.controller('SignupController', [ '$scope', 'Auth', '$alert', '$modal', 
 	function($scope, Auth, $alert, $modal) {
	 	$scope.signup = function() {
	 		
	 		$scope.formErrors = [];

	 		if($scope.firstname == undefined) {
	 			$scope.formErrors.push('Firstname');
	 		}

	 		if($scope.lastname == undefined) {
	 			$scope.formErrors.push('Lastname');
	 		}

	 		if($scope.email == undefined) {
	 			$scope.formErrors.push('Email');
	 		}

	 		if($scope.password == undefined) {
	 			$scope.formErrors.push('password');
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
	 		
	 		Auth.signup({
	 			firstname: $scope.firstname,
	 			lastname: $scope.lastname,
	 			email: $scope.email,
	 			password: $scope.password
	 		});
 		};

 		$scope.reset = function() {
 			$scope.firstname = "";
			$scope.lastname = "";
			$scope.email = "";
			$scope.password = "";
 		}

 }]);
