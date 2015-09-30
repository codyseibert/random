angular.module('cards')
.controller('CardsController', function CardsController($scope, cardsService) {
	'use strict';

    cardsService.get()
        .success(function(data, status, headers, config){ 
       
            for (var i = 0; i < data.length; i++){
                data[i].front = true;
            }

            $scope.cards = data;
        })

    $scope.flip = function(card){ 
        card.front = !card.front; 
    }
});
