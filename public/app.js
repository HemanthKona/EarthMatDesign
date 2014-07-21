/*
	app.js
	Create AngularJs module and add its dependencies

	Revision history
	Pranav Maharaj, 2014.06.19: created 
	Pranav Maharaj, 2014.06.19: added routes and templateUrls

*/ 

var app = angular.module('DHPEMD', 
	[ 'ngAnimate', 'ngCookies', 'ngMessages', 'ui.router', 'ngResource', 'mgcrea.ngStrap', 'ngMaterial' ] );

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 
	function($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider

		.state('home', {
			url: '/home',
			templateUrl: 'views/home.html'
		})
		
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'views/signup.html',
		})

		.state('profile', {
			url: '/profile',
			templateUrl: 'views/profile.html',
		})

		.state('projects', {
			url: '/projects',
			templateUrl: 'views/projects.html',
			controller: 'ProjectController'
		})  

	// route to show our basic form (/form)
    .state('form', {
      url: '/form',
      templateUrl: 'views/forms/form.html',
      controller: 'NewProjectController'
    })
    
    // nested states 
    // each of these sections will have their own view
    // url will be nested (/form/profile)
    .state('form.electrical', {
      url: '/electrical',
      templateUrl: 'views/forms/form-electrical.html'
    })
    
    // url will be /form/physical
    .state('form.physical', {
      url: '/physical',
      templateUrl: 'views/forms/form-physical.html'
    })
    
    // url will be /form/factors
    .state('form.factors', {
      url: '/factors',
      templateUrl: 'views/forms/form-factors.html'
    })

    //url will be /form/designGrade
    .state('form.designGrade', {
    	url: '/designGrade',
    	templateUrl: 'views/forms/designGrade.html'
    });
     

		
		$urlRouterProvider.otherwise('/home');

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
