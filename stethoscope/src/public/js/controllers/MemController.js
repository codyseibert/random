angular.module('stethoscope')
    .controller('MemController', [
    '$scope',
    '$routeParams',
    'ServersService',
    'SortService',
    'MemsService',
    function (
        $scope,
        $routeParams,
        ServersService,
        SortService,
        MemsService
    ) {
        'use strict';

        $scope.chart = {};

        var createMemGraph = function (pData) {
            var i,
                dataCopy = pData.slice(0),
                labels = [],
                free = [],
                used = [];

            SortService.sortByDate(dataCopy);

            for (i = 0; i < dataCopy.length; i += 1) {
                free.push(Math.max(0, dataCopy[i].free / 1000));
                used.push(Math.max(0, dataCopy[i].used / 1000));
                labels.push("");
            }

            $scope.chart.labels = labels;
            $scope.chart.data = [free, used];
            $scope.chart.series = ["free (mb)", "used (mb)"];
            $scope.chart.options = {
                scaleFontColor: "#000",
                scaleFontSize: 20,
                animation: false,
                showTooltips: false
            };
        };

        $scope.serverId = $routeParams.serverId;

        ServersService.getServer($scope.serverId)
            .success(function (pData) {
                $scope.server = pData;
            });

        MemsService.getMems($scope.serverId)
            .success(function (pData) {
                createMemGraph(pData);
            });
    }]);
