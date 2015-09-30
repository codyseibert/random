angular.module('blog')
.factory('projectsService', function ($http) {
    'use strict';

    return {
        getByType: function (type) {
            return $http({
                method: "GET",
                url: "php/app.php/projects/type/" + type
            });
        },

        getById: function (id) {
            return $http({
                method: "GET",
                url: "php/app.php/projects/" + id 
            });
        },

        create: function (obj) {
            return $http({
                method: "POST",
                url: "php/app.php/projects",
                data: obj
            });
        },

        /**
            Assumptions:
                obj = {
                    id,
                    title,
                    img,
                    html,
                    type
                }
        */
        update: function (obj) {
            return $http({
                method: "POST",
                url: "php/app.php/projects/" + obj.id,
                data: obj
            });
        }
    };
});
