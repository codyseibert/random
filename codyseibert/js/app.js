angular.module('blog', ['ngRoute', 'ngCookies'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider
        .when('/login', {
            controller: 'loginController',
            templateUrl: 'templates/login.tpl'
        })
        .when('/logout', {
            controller: 'logoutController',
            templateUrl: 'templates/logout.tpl'
        })
		.when('/posts', {
			controller: 'postsController',
			templateUrl: 'templates/posts.tpl'
		})
        .when('/about', {
			controller: 'aboutController',
			templateUrl: 'templates/about.tpl'
        })
        .when('/projects/:id', {
            controller: 'projectController',
            templateUrl: 'templates/project.tpl'
        })
        .when('/:type', {
			controller: 'projectsController',
			templateUrl: 'templates/projects.tpl'
        })
		.otherwise({
			redirectTo: '/posts'
		});
	})
    .run(function($cookies, $rootScope, $http){

        // Set the users login information on the header if they already logged in
        if ($cookies.username) {
            $rootScope.isAdmin = true; 
            var creds = btoa($cookies.username + ":" + $cookies.password);
            $http.defaults.headers.common['Authorization'] = "Basic " + creds;
        } 
    })
