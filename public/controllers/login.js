/*
	login.js
	Login controller

	Revision history
	Pranav Maharaj, 2014.06.20: created
*/

app.controller('LoginController', [ '$scope', 'Auth',  
	function($scope, Auth) {
		$scope.login = function() {
			Auth.login({
				email: $scope.email,
				password: $scope.password
			});
	};
}]);
