
angular.module('stethoscope')
    .factory('NetsService', ['$http', function ($http) {
        'use strict';

        return {
            getNets: function () {
                return $http({
                    method: "GET",
                    url: "api/nets"
                });
            }
        };
    }]);
