/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('beads')
	.controller('BeadsCtrl', function BeadsCtrl($scope, $routeParams, $filter, beadsStorage, patternsResource) {
		'use strict';
		$scope.info = "";
		var stock = $scope.stock = beadsStorage.get();
		var patterns = $scope.patterns = patternsResource.get();
		$scope.selectedPattern = {};
		$scope.color = "";
	
		$scope.$watch("stock", function(newValue, oldValue){
			beadsStorage.put(newValue);
		}, true);
			
		$scope.addColor = function(){
			var newColor = {color: $scope.color, count: 0};
			stock[$scope.color] = newColor;	
		};	
		
		$scope.clicked = function(patternName){
			$scope.selectedPattern = patterns[patternName].bead_list;	
		};
		
		$scope.getBeadDifference = function(colorName){
			var inStock = $scope.stock[colorName];
			var inStockCount = 0;
			if (inStock !== undefined){
				inStockCount = inStock.count;
			}
			var dif = inStockCount - $scope.selectedPattern[colorName].count;
			return dif;
		};

		$scope.subtractPattern = function(){
			for (var color in $scope.selectedPattern){
				var count = $scope.selectedPattern[color].count;
				if ($scope.stock[color] !== undefined){
					$scope.stock[color].count -= count;
				}
			}
		};
	});
