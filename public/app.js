/*
	app.js
	AngularJs configauratio

	Revision history
	Hemanth Kona, 2014.06.19: created 

*/ 


var app = angular.module('DHPEMD', 
	[ 'ngCookies', 'ngMessages', 'ngRoute', 'ngResource', 'mgcrea.ngStrap' ] );

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
		})
		.when('/login', {
			templateUrl: 'views/login.html',
		})
		.when('/signup', {
			templateUrl: 'views/signup.html',
		})
		.otherwise({
			redirectTo: '/'
		});

}]);