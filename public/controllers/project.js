/* 
	project.js
	Project controller 

	Revision history
	Hemanth Kona, 2014.06.23: created
 */
 app.controller('ProjectController', [ 'Project', '$scope', '$location', '$route',   
 	function(Project, $scope, $location, $route) {
 		$scope.projects =  Project.query({
 			isArray: true
 		})

 		$scope.remove = function(id, index) {
 			Project.remove({id: id}, function() {
 				$scope.projects.splice(index, 1);
 			});
 		}
 }]);