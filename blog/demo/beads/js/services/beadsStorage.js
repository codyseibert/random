/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('beads')
	.factory('beadsStorage', function () {
		'use strict';

		var STORAGE_ID = 'beads-angularjs';

		return {
			get: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || "{}");
			},

			put: function (obj) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(obj));
			}
		};
	});
