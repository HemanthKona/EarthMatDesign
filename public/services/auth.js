app.factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert', 
	function($http, $location, $rootScope, $cookieStore, $alert) {
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

						console.log('You are logged out');
					})
			}			
		}
	}]);