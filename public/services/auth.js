/* 
	auth.js
	User authentication service 

	Revision history
	Pranav Maharaj, 2014.06.20: created
	Pranav Maharaj, 2014.06.21: defined login, signup functions 
	Pranav Maharaj, 2014.06.21: defined logout function 
 */

 app.factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert',
	function($http, $location, $rootScope, $cookieStore, $alert) {
		$rootScope.currentUser = $cookieStore.get('user');
		$cookieStore.remove('user');
		
		return {
			login: function(user) {
				return $http.post('/api/login', user)
					.success(function(data) {
						$rootScope.currentUser = data;
						$location.path('/projects');

						$alert({
                title: 'Success!',
                content: 'You are successfully logged in.',
                placement: 'top-right',
                type: 'success',
                duration: 3
              });
					})
					.error(function(response) {
            console.log(response);
            $alert({
                title: 'Error!',
                content: 'Invalid username or password',
                placement: 'top-right',
                type: 'danger',
                duration: 3   
              });
          });
			},
			signup: function(user) {
				return $http.post('/api/signup', user)
					.success(function(data) {
						$location.path('/login');

						$alert({
                title: 'Congratulations!',
                content: 'Your account has been created.',
                placement: 'top-right',
                type: 'success',
                duration: 3
              });
					})
					.error(function(response) {
						$alert({
                title: 'Error!',
                content: response,
                placement: 'top-right',
                type: 'danger',
                duration: 3
              });
					});	
			},
			logout: function() {
				return $http.get('/api/logout')
					.success(function() {
						$rootScope.currentUser = null;
						$cookieStore.remove('user');

						$location.path('/home');
						console.log('You are logged out');
					})
			}			
		}
	}]);