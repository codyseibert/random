angular.module('stethoscope')
    .controller('CpuController', [
    '$scope',
    '$routeParams',
    'ServersService',
    'SortService',
    'CpusService',
    function (
        $scope,
        $routeParams,
        ServersService,
        SortService,
        CpusService
    ) {
        'use strict';

        $scope.chart = {};

        var createCpuGraph = function (pData) {
            var i,
            dataCopy = pData.slice(0),
            labels = [],
            percent = [];

            SortService.sortByDate(dataCopy);

            for (i = 0; i < dataCopy.length; i += 1) {
                percent.push(Math.max(0, dataCopy[i].percent));
                labels.push("");
            }

            $scope.chart.labels = labels;
            $scope.chart.data = [percent];
            $scope.chart.series = ["percent (%)"];
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

        CpusService.getCpus($scope.serverId)
            .success(function (pData) {
                createCpuGraph(pData);
            });
    }]);
