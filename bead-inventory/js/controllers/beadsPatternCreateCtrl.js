/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('beads')
	.controller('BeadsPatternCreateCtrl', 
		function BeadsPatternCreateCtrl($scope, $location, patternsResource) {
		'use strict';
		
		var patterns = patternsResource.get();
		var beads = $scope.pattern = {};
		$scope.color = "";
		$scope.name = "";
			
		$scope.addColor = function(){
			var ingredient = {color: $scope.color, count: 0};
			beads[$scope.color] = ingredient;
		};	

		$scope.save = function(){
			var pattern = {
				name: $scope.name,
				bead_list: beads
			};
			patterns[$scope.name] = pattern;
			patternsResource.put(patterns);
			$location.path("/");
		};
		
	});
