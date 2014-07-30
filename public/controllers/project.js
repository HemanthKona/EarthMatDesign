/* 
	project.js
	Project controller 

	Revision history
	Hemanth Kona, 2014.06.23: created
 */
 app.controller('ProjectController', [ 'Project', '$scope', '$rootScope', '$location', '$alert', '$state',  
 	function(Project, $scope, $rootScope, $location, $alert, $state) {
 		$rootScope.pageTitle = "Projects"
 		$scope.show = true;
 		
 		/* Retrieve all the projects from mongodb database */ 
 		/* Store projects in rootscope*/
 		$rootScope.projects =  Project.query({
 			isArray: true
 		},
		function(data) {

		},
		function(response) {
			$alert({
	      title: 'Error!',
	      content: response.data,
	      placement: 'top-right',
	      type: 'danger',
	      duration: 3   
	    });
		});

 		/* Edit project */
 		$scope.editProject = function(id, index) {

			$rootScope.currentProject = $scope.projects[index];
			$state.go('edit.electrical', {projectId: $rootScope.currentProject._id})
			//$location.path('/edit/electrical/$rootscope.currentProject._id');
		} 

		/*Remov project from database*/
 		$scope.remove = function(id, index) {
 			Project.remove({id: id}, function() {
 				$rootScope.projects.splice(index, 1);
 			});
 		}
 }]);
