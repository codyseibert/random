angular.module('doit', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider
        .when('/', {
            controller: 'viewController',
            templateUrl: 'templates/view.tpl'
        })
        .when('/templates/:id', {
            controller: 'templateController',
            templateUrl: 'templates/templates.tpl'
        })
		.otherwise({
			redirectTo: '/'
		});
	})
