angular.module('blog')
.controller('projectController', function ProjectController($scope, projectsService, $routeParams, $sce) {
	'use strict';

    var id = $routeParams.id;

    projectsService.getById(id)
        .success(function(data, status, headers, config){
            $scope.html = $sce.trustAsHtml(data.html);
            $scope.edit_title = data.title;
            $scope.edit_html = data.html;
            $scope.edit_img = data.img;
            $scope.edit_type = data.type;
        });

    $scope.back = function(){
        window.history.back();
    };

    $scope.update = function() {
        var dto = {
            id: id,
            title: $scope.edit_title,
            img: $scope.edit_img,
            html: $scope.edit_html,
            type: $scope.edit_type
        };
        projectsService.update(dto)
            .success(function(data, status, headers, config){
                $scope.html = $sce.trustAsHtml(data.html);
            });
    };
});
