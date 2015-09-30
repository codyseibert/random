angular.module('stethoscope')
    .factory('SortService', ['$http', function ($http) {
        'use strict';

        return {
            sortByDate: function (pData) {
                var i;

                for (i = 0; i < pData.length; i += 1) {
                    pData[i].date = moment(pData[i].date).valueOf();
                };

                pData.sort(function (a, b) {
                    return a.date - b.date;
                })
            }
        };
    }]);
