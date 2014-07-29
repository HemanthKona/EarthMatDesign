/*
  project.js
  Project service to talk to backend

  Revision history
  Hemanth Kona, 2014.06.28: created
*/

app.factory('Project', ['$resource', function($resource, $http, $rootScope) {
	return $resource('/api/projects/:id');

	// return {
	// 	allProjects: function(currentUser) {
	// 		return $http.get('/api/projects', currentUser) 
	// 			.success(function(data) {
	// 				$rootScope.projects = data;
	// 				console.log(data)
	// 				console.log($rootScope.projects)
	// 			})
	// 			.error(function(response) {
	// 				console.log(response)
	// 			})
	// 		}
	// }
}]);