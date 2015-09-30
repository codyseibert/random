
angular.module('stethoscope')
    .factory('ServersService', ['$http', function ($http) {
        'use strict';

        return {
            getServers: function () {
                return $http({
                    method: "GET",
                    url: "api/servers"
                });
            },
            getServer: function (pServerId) {
                return $http({
                    method: "GET",
                    url: "api/servers/" + pServerId
                });
            }
        };
    }]);
