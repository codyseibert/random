angular.module('doit')
.factory('templatesService', function ($http) {
    'use strict';

    return {
        create: function (obj) {
            return $http({
                method: "POST",
                url: "php/app.php/templates",
                data: obj
            });
        },

        read: function () {
            return $http({
                method: "GET",
                url: "php/app.php/templates"
            });
        },

        readById: function (id) {
            return $http({
                method: "GET",
                url: "php/app.php/templates/" + id
            });
        },

        readTasks: function(id){
            return $http({
                method: "GET",
                url: "php/app.php/templates/" + id + "/tasks"
            });
        },

        update: function (template) {
            return $http({
                method: "POST",
                url: "php/app.php/templates/" + template.id,
                data: template
            })
        },

        delete: function (id) {
            return $http({
                method: "DELETE",
                url: "php/app.php/templates/" + id
            })
        }
    };
});
