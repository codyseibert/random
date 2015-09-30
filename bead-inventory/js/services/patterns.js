/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('beads')
	.factory('patternsResource', function () {
		'use strict';

		var STORAGE_ID = 'beads-resource';

		return {
			get: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || "{}");
			},

			put: function(patterns){
				localStorage.setItem(STORAGE_ID, JSON.stringify(patterns));
			}
		};
	});
