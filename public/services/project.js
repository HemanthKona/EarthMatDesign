/*
  project.js
  Project service to talk to backend

  Revision history
  Hemanth Kona, 2014.06.28: created
*/

app.factory('Project', ['$resource', function($resource) {
	return $resource('http://localhost:5000/api/projects/:id');
}]);