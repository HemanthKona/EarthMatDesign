/*
	app.js
	Create AngularJs module and add its dependencies

	Revision history
	Pranav Maharaj, 2014.06.19: created 
	Pranav Maharaj, 2014.06.19: added routes and templateUrls

*/ 

var app = angular.module('DHPEMD', 
	[ 'ngAnimate', 'ngCookies', 'ngMessages', 'ui.router', 'ngResource', 'mgcrea.ngStrap', 'ngMaterial' ] );

app.config(['$urlRouterProvider', '$locationProvider', '$stateProvider',   function($urlRouterProvider, $locationProvider, $stateProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('root', {
			url: '/',
			templateUrl: 'views/login.html',
			controller: 'ProjectController'
		})
		
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
		})
		
		
		$urlRouterProvider.otherwise('/');

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
