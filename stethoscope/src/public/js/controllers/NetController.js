angular.module('stethoscope')
    .controller('NetController', [
    '$scope',
    '$routeParams',
    'ServersService',
    'SortService',
    'NetsService',
    function (
        $scope,
        $routeParams,
        ServersService,
        SortService,
        NetsService
    ) {
        'use strict';

        $scope.chart = {};

        var createNetGraph = function (pData) {
            var i,
                dataCopy = pData.slice(0),
                labels = [],
                tx = [],
                rx = [];

            SortService.sortByDate(dataCopy);

            for (i = 1; i < dataCopy.length; i += 1) {
                tx.push(Math.max(0, (dataCopy[i].tx - dataCopy[i - 1].tx) / 1000000));
                rx.push(Math.max(0, (dataCopy[i].rx - dataCopy[i - 1].rx) / 1000000));
                labels.push("");
            }

            $scope.chart.labels = labels;
            $scope.chart.data = [tx, rx];
            $scope.chart.series = ["tx (mb)", "rx (mb)"];
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

        NetsService.getNets($scope.serverId)
            .success(function (pData) {
                createNetGraph(pData);
                console.log(pData.length);
            });
    }]);
