
angular.module('stethoscope')
    .factory('CpusService', ['$http', function ($http) {
        'use strict';

        return {
            getCpus: function () {
                return $http({
                    method: "GET",
                    url: "api/cpus"
                });
            }
        };
    }]);
