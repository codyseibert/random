angular.module('blog')
.factory('postsService', function ($http) {
    'use strict';

    return {
        get: function () {
            return $http({
                method: "GET",
                url: "php/app.php/posts"
            });
        },

        /**
            Assumptions:
                dto = {
                    id,
                    title,
                    html
                }
        */
        update: function (dto) {
            return $http({
                method: "POST",
                url: "php/app.php/posts/" + dto.id,
                data: dto 
            });
        },

        post: function (dto) {
            return $http({
                method: "POST",
                url: "php/app.php/posts",
                data: dto
            });
        }

    };
});
