angular.module('doit')
.factory('tasksService', function ($http) {
    'use strict';

    return {
        create: function (obj) {
            return $http({
                method: "POST",
                url: "php/app.php/tasks",
                data: obj
            });
        },

        read: function () {
            return $http({
                method: "GET",
                url: "php/app.php/tasks"
            });
        },

        readById: function (id) {
            return $http({
                method: "GET",
                url: "php/app.php/tasks/" + id
            });
        },

        update: function (task) {
            return $http({
                method: "POST",
                url: "php/app.php/tasks/" + task.id,
                data: task
            })
        },

        delete: function (id) {
            return $http({
                method: "DELETE",
                url: "php/app.php/tasks/" + id
            })
        }
    };
});
