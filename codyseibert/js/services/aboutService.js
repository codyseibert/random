angular.module('blog')
.factory('aboutService', function ($http) {
    'use strict';

    return {
        get: function () {
            return $http({
                method: "GET",
                url: "php/app.php/about"
            });
        },

        update: function (obj) {
            return $http({
                method: "POST",
                url: "php/app.php/about",
                data: obj
            });
        }
    };
});
