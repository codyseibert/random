angular.module('blog')
.controller('projectsController', function ProjectsController($scope, projectsService, $routeParams, $location, $sce) {
	'use strict';

    $scope.projects = [];

    var type = $routeParams.type;
    $scope.type = type;

    projectsService.getByType(type)
        .success(function(data, status, headers, config){
            $scope.projects = data;
        });

    $scope.navigateTo = function(projectId){
        $location.path("/projects/" + projectId);
    }

    $scope.edit = function(project) {
        project.isEditMode = true;
        project.edit_title = project.original_title;
        project.edit_img = project.original_img;
    };

    $scope.save = function(project) {
        project.isEditMode = false;

        project.original_title = project.edit_title;
        project.original_img = project.edit_img;

        project.title = $sce.trustAsHtml(project.edit_title);
        project.img= $sce.trustAsHtml(project.edit_img);
    
        var dto = {
            id: project.id,
            title: project.edit_title,
            img: project.edit_img,
            html: project.original_html
        };
        projectsService.update(dto)
            .success(function(data, status, headers, config){
                console.log(data); 
            });
    }

    $scope.cancel = function(project) {
        project.isEditMode = false;
    }

    $scope.create = function() {
        var dto = {
            title: $scope.new_title,
            img: $scope.new_img,
            html: $scope.new_html,
            type: type
        };

        projectsService.create(dto)
            .success(function(data, status, headers, config){
                data.title = $sce.trustAsHtml(data.title);
                data.html = $sce.trustAsHtml(data.html);
                $scope.projects.push(data);
        
                $scope.new_title = "";
                $scope.new_img = "";
                $scope.new_html = "";
            });
    }
});
