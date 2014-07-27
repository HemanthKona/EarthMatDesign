/* 
	signup.js
	Sign up controller

	Revision history
	Pranav Maharaj, 2014.06.20: created
 */

 app.controller('SignupController', [ '$scope', 'Auth', 
 	function($scope, Auth) {
	 	$scope.signup = function() {
	 		Auth.signup({
	 			firstname: $scope.firstname,
	 			lastname: $scope.lastname,
	 			email: $scope.email,
	 			password: $scope.password
	 		});
 	};
 }]);
