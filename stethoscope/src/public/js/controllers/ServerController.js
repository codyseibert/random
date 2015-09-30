angular.module('stethoscope')
    .controller('ServerController', [
    '$scope',
    '$routeParams',
    function (
        $scope,
        $routeParams
    ) {
        'use strict';
        $scope.serverId = $routeParams.serverId;
    }]);
