angular.module('blog')
.controller('templatesController', function TemplatesController($scope, templatesService, $routeParams) {
	'use strict';

    var id = $routeParams.id;

    templatesService.read(id)
        .success(function(data, status, headers, config){
        });

    $scope.save = function() {
        var dto = {
            html: $scope.new_html
        };
        aboutService.update(dto)
            .success(function(data, status, headers, config){
                $scope.html = $sce.trustAsHtml($scope.new_html);
            });
    };
});
