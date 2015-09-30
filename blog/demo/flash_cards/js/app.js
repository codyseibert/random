angular.module('cards', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider
		.when('/', {
			controller: 'CardsController',
			templateUrl: 'card-list-page.html'
		}) 
		.otherwise({
			redirectTo: '/'
		});
	});
