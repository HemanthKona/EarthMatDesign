/* 
	signup.js
	Sign up controller

	Revision history
	Pranav Maharaj, 2014.06.20: created
 */

 app.controller('SignupController', [ '$scope', 'Auth', '$alert', 
 	function($scope, Auth, $alert) {
	 	$scope.signup = function() {
	 		
	 		$scope.errors = "";

	 		if($scope.firstname == undefined) $scope.errors  += "firstname" + "," ;
	 		if($scope.lastname == undefined) $scope.errors  += "lastname" + "," ;
	 		if($scope.email == undefined) $scope.errors  += "email" + "," ;
	 		if($scope.password == undefined) $scope.errors  += "password" + "," ;
	 		
	 		if($scope.errors != "") {
	 			
	 			$alert({
	 				title: "Error!",
	 				content: "Please correct these fields:" +$scope.errors,
	 				placement: 'top-right',
          type: 'danger',
          duration: 3
	 			})

	 			$scope.errors = "";

	 			return;
	 		}

	 		Auth.signup({
	 			firstname: $scope.firstname,
	 			lastname: $scope.lastname,
	 			email: $scope.email,
	 			password: $scope.password
	 		});
 	};
 }]);
