angular.module('cards')
.factory('cardsService', function ($http) {
    'use strict';

    return {
        get: function () {
            return $http({
                method: "GET",
                url: "php/app.php/cards"
            });
        },

        put: function (obj) {

        }
    };
});
