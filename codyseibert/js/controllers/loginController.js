angular.module('blog')
.controller('loginController', function LoginController(
    $scope, $routeParams, loginService, 
    $cookies, $rootScope, $http, $location) {
	'use strict';
    
    $scope.invalid = false;

    $scope.login = function() { 
        var creds = btoa($scope.username + ":" + $scope.password);
        $http.defaults.headers.common['Authorization'] = "Basic " + creds;
        loginService.login()
            .success(function(data, status, headers, config){
                if (data == "valid") { 
                    $rootScope.isAdmin = true;
                    $cookies.username = $scope.username;
                    $cookies.password = $scope.password;
                    $location.path('posts');
                } else {
                    $scope.invalid = true;
                }
            });
    }
});
