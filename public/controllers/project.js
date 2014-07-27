/* 
	project.js
	Project controller 

	Revision history
	Hemanth Kona, 2014.06.23: created
 */
 app.controller('ProjectController', [ 'Project', 'Auth', '$scope', '$rootScope', '$location',   
 	function(Project, Auth, $scope, $rootScope, $location) {
 		$rootScope.pageTitle = "Projects"
 		$scope.show = true;
 		$scope.projects =  Project.query({
 			isArray: true
 		})

 		$scope.remove = function(id, index) {
 			Project.remove({id: id}, function() {
 				$scope.projects.splice(index, 1);
 			});
 		}
 }]);
