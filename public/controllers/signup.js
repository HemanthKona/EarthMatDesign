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
	 			name: {
	 				first: $scope.firstname,
	 				last: $scope.lastname
	 			},
	 			email: $scope.email,
	 			password: $scope.password
	 		});
 	};
 }]);
