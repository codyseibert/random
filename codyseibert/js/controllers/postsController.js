angular.module('blog')
.controller('postsController', function PostsController($scope, postsService, $sce) {
	'use strict';

    postsService.get()
        .success(function(data, status, headers, config){
            for (var i = 0; i < data.length; i++){
                var post = data[i];
                post.original_title = post.title;
                post.original_html = post.html;

                post.edit_title = post.original_title;
                post.edit_html = post.original_html;
                
                post.title = $sce.trustAsHtml(post.title);
                post.html = $sce.trustAsHtml(post.html);

                post.date = moment(post.date).format("dddd, MMMM Do YYYY, h:mm:ss a");
            };
            $scope.posts = data;
        });

    $scope.edit = function(post) {
        post.isEditMode = true;
        post.edit_title = post.original_title;
        post.edit_html = post.original_html;
    };

    $scope.save = function(post) {
        post.isEditMode = false;

        post.original_title = post.edit_title;
        post.original_html = post.edit_html;

        post.title = $sce.trustAsHtml(post.edit_title);
        post.html = $sce.trustAsHtml(post.edit_html);
    
        // Save off to REST service
        var dto = {
            id: post.id,
            title: post.edit_title,
            html: post.edit_html
        };
        postsService.update(dto)
            .success(function(data, status, headers, config){
                
            });
    }

    $scope.cancel = function(post) {
        post.isEditMode = false;
    }

    $scope.post = function() {
        var dto = {
            title: $scope.new_title,
            html: $scope.new_html
        };
        postsService.post(dto)
            .success(function(data, status, headers, config){
                data.title = $sce.trustAsHtml(data.title);
                data.html = $sce.trustAsHtml(data.html);
                $scope.posts.unshift(data);
        
                $scope.new_title = "";
                $scope.new_html = "";
            });
    }
});
