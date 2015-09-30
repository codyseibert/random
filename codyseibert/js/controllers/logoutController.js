angular.module('blog')
.controller('logoutController', function LogoutController($scope, $cookies, $location, $rootScope) {
	'use strict'; 
    $cookies.username = ""; 
    $cookies.password = ""; 
    $rootScope.isAdmin = false; 
    $location.path("posts"); 
});
