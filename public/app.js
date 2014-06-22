/*
	app.js
	Define main Angular Module

	Revision history
	Hemanth Kona, 2014.06.19: created 

*/ 


var app = angular.module('DHPEMD', 
	[ 'ngCookies', 'ngMessages', 'ngRoute', 'ngResource', 'mgcrea.ngStrap' ] );

ap.config([ '$locationProvider', '$routeProvider'], function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignUpController'
		})
});