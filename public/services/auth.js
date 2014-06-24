/* 
	auth.js
	User authentication service 

	Revision history
	Pranav Mahraj, 2014.06.20: created
	Pranav Mahraj, 2014.06.21: defined login, signup functions 
	Pranav Mahraj, 2014.06.21: defined logout function 
 */

 app.factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore',  
	function($http, $location, $rootScope, $cookieStore) {
		$rootScope.currentUser = $cookieStore.get('user');
		$cookieStore.remove('user');

		return {
			login: function(user) {
				return $http.post('/api/login', user)
					.success(function(data) {
						$rootScope.currentUser = data;
						$location.path('/');

						console.log('success');
					})
					.error(function() {
            console.log('Error')
          });
			},
			signup: function(user) {
				return $http.post('/api/signup', user)
					.success(function(data) {
						$location.path('/login');

						console.log('success');
					})
					.error(function(response) {
						console.log('Error: ' + response.data);
					});	
			},
			logout: function() {
				return $http.get('/api/logout')
					.success(function() {
						$rootScope.currentUser = null;
						$cookieStore.remove('user');

						$location.path('/');
						console.log('You are logged out');
					})
			}			
		}
	}]);