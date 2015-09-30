angular.module('stethoscope', ['ngRoute', 'chart.js'])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/servers', {
                controller: 'ServersController',
                templateUrl: 'templates/ServersTemplate.tpl'
            })
            .when('/servers/:serverId', {
                controller: 'ServerController',
                templateUrl: 'templates/ServerTemplate.tpl'
            })
            .when('/servers/:serverId/cpu', {
                controller: 'CpuController',
                templateUrl: 'templates/CpuTemplate.tpl'
            })
            .when('/servers/:serverId/net', {
                controller: 'NetController',
                templateUrl: 'templates/NetTemplate.tpl'
            })
            .when('/servers/:serverId/mem', {
                controller: 'MemController',
                templateUrl: 'templates/MemTemplate.tpl'
            })
            .otherwise({
                redirectTo: '/servers'
            });

    }])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        'use strict';
        $rootScope.navigateToServer = function (pServerId) {
            $location.path('servers/' + pServerId);
        }
    }]);
