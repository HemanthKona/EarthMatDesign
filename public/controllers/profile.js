/* 
	profile.js
	Profile controller 

	Revision history
	Hemanth Kona, 2014.07.23: created
 */
 app.controller('ProfileController', [ '$scope', '$rootScope', '$http', '$alert', '$location',   
 	function( $scope, $rootScope, $http, $alert, $location) {
 		
 		$rootScope.pageTitle = "Profile";

 		$scope.userProfileDetails = {};

 		$scope.editProfile = false;

 		// $scope.userProfileDetails.email = $rootScope.currentUser.email; 
 		// $scope.userProfileDetails.firstname = $rootScope.currentUser.firstname; 
 		// $scope.userProfileDetails.lastname = $rootScope.currentUser.lastname; 
		
 		$scope.updateProfile = function () {
 			
 			console.log($scope.userProfileDetails);

 			$http.put('/api/profile', $scope.userProfileDetails)
 				.success(function(data) {
 					$rootScope.currentUser = data;
 					console.log(data);
 					$scope.editProfile = false;
 					$alert({
 						title: 'Success!',
            content: 'Firstname and Lastname are updated',
            placement: 'top-right',
            type: 'success',
            duration: 3
 					})
 				})
 				.error(function(response) {
 					$alert({
            title: 'Error!',
            content: response.data.message,
            placement: 'top-right',
            type: 'danger',
            duration: 3
          });
 				});
 		}

 		$scope.updatePassword = function () {
 			console.log($scope.userProfileDetails.password);
 			$http.put('/api/updatePassword', $scope.userProfileDetails)
 				.success(function(data) {
 					console.log("success" + data);
          $scope.editPassword = false;
 					$alert({
 						title: 'Success!',
            content: 'Password updated',
            placement: 'top-right',
            type: 'success',
            duration: 3
 					})
 				})
 				.error(function (response) {
          console.log(response);
 					$alert({
            title: 'Error!',
            content: response.data.message,
            placement: 'top-right',
            type: 'danger',
            duration: 5
          });
 				})
 		}

 		
 }]);
