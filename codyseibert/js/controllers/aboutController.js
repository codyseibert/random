angular.module('blog')
.controller('aboutController', function AboutController($scope, aboutService, $sce) {
	'use strict';


    aboutService.get()
        .success(function(data, status, headers, config){
            $scope.new_html = data[0].html;
            $scope.html = $sce.trustAsHtml(data[0].html);
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
