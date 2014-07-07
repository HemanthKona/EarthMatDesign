/*
	app.js
	Create AngularJs module and add its dependencies

	Revision history
	Pranav Maharaj, 2014.06.19: created 
	Pranav Maharaj, 2014.06.19: added routes and templateUrls

*/ 


var app = angular.module('DHPEMD', 
	[ 'ngAnimate', 'ngCookies', 'ngMessages', 'ngRoute', 'ngResource', 'mgcrea.ngStrap', 'ngMaterial' ] );

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'views/projects.html',
			controller: 'ProjectController'
		})
		.when('/home', {
			templateUrl: 'views/home.html',
		})
		.when('/login', {
			templateUrl: 'views/login.html',
		})
		.when('/signup', {
			templateUrl: 'views/signup.html',
		})
		.when('/profile', {
			templateUrl: 'views/profile.html',
		})
		.when('/projects', {
			templateUrl: 'views/projects.html',
			controller: 'ProjectController'
		})
		.when('/project/new', {
			templateUrl: 'views/newProject.html',
			controller: 'NewProjectController'
		})
		.when('/project/result', {
			templateUrl: 'views/result.html',
			controller: 'NewProjectController'
		})
		.otherwise({
			redirectTo: '/'
		});

}]);

// app.run( function($rootScope, $location) {

//     // register listener to watch route changes
//     $rootScope.$on( "$routeChangeStart", function(event, next, current) {
//       if ( $rootScope.currentUser == null ) {
//         // no logged user, we should be going to #login
//         if ( next.templateUrl == "views/login.html" || next.templateUrl == "views/signup.html" ) {
//           // already going to #login, no redirect needed
//         } else {
//           // not going to #login, we should redirect now
//           $location.path( "/login" );
//         }
//       }
//       // else if the user is logged in dont show login or signup page
//       else {
      	
//       	if ( next.templateUrl == "views/login.html" || next.templateUrl == "views/signup.html" ) {
//           $location.path( "/" );
//         } 
//       }        
//     });
//  });
