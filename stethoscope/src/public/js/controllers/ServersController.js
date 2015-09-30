
angular.module('stethoscope')
    .controller('ServersController', [
        '$scope',
        'ServersService',
        function (
        $scope,
        ServersService
        ) {
            'use strict';

            $scope.server = {};

            ServersService.getServers()
                .success(function (pData) {
                    $scope.servers = pData;
                });
        }]);
