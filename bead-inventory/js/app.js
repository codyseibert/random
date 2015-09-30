/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('beads', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider
		.when('/', {
			controller: 'BeadsCtrl',
			templateUrl: 'beads-index.html'
		})
		.when('/patterns/create', {
			controller: 'BeadsPatternCreateCtrl',
			templateUrl: 'beads-pattern-create.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
