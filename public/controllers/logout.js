/* 
	logout.js
	Logout controller

	Revision history
	Pranav Maharaj, 2014.06.20: created
 */

 app.controller('LogoutController', [ '$scope', 'Auth', 
 	function($scope, Auth) {
	 	$scope.logout = function() {
	 		Auth.logout();
 		};
 }]);