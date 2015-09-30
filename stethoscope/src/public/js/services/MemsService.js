
angular.module('stethoscope')
    .factory('MemsService', ['$http', function ($http) {
        'use strict';

        return {
            getMems: function () {
                return $http({
                    method: "GET",
                    url: "api/mems"
                });
            }
        };
    }]);
