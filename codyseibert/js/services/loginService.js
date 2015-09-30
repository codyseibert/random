angular.module('blog')
.factory('loginService', function ($http) {
    'use strict';

    return {
        login: function () {
            return $http({
                method: "POST",
                url: "php/app.php/login"
            });
        }
    };
});
