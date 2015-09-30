angular.module('doit')
.controller('viewController', function ViewController($scope, templatesService, $interval, $window, $location) {
	'use strict';

    var SCALE_AMOUNT = 3;

    function scale(unix){
        return unix / 60 * SCALE_AMOUNT;
    }

    function timeToOffset(unix) {
        var start = moment("00:00:00", "HH:mm:ss").unix();
        return scale(unix - start);
    }

    function getHeight(start, end) {
        var dif = end - start;
        return scale(dif);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];               }
        return color;
    }

    $interval(function(){
        var zero = moment("00:00:00", "HH:mm:ss").unix();
        var now = moment().unix();
        var dif = now - zero;
        var s = -scale(dif);
        var ho = $window.innerHeight / 2;
        s += ho;
        $scope.offset = s;
        $scope.centerY = $window.innerHeight / 2;
    }, 1000);

    $scope.lines = [];
    for (var i = 0; i < 24; i++) {
        var m = moment(i, "H");
        var o = {
            text: m.format("hh:mm A"),
            offset: scale(i * 60 * 60)
            
        }
        $scope.lines.push(o);
    }

    $scope.selectTemplate = function(){
        templatesService.readTasks($scope.selected_template)
        .success(function(data, status, headers, config){
           
            var i; 
            for (i = 0; i < data.length; i++) {
                data[i].st = moment(data[i].start_time, "HH:mm:ss");
                data[i].et = moment(data[i].end_time, "HH:mm:ss");
                data[i].st = data[i].st.unix() + 60 * 7;
                data[i].et = data[i].et.unix() - 60 * 5;
                data[i].offset = timeToOffset(data[i].st);
                data[i].height = getHeight(data[i].st, data[i].et);
                data[i].color = getRandomColor();
            }

            $scope.tasks = data;
        });
    };
    
    $scope.newTemplate = function() {
        var dto = {
            name: "Default Name"
        };
        templatesService.create(dto)
            .success(function(data, status, headers, config) {
                $location.path("templates/" + data.id);
            });
    };

    $scope.editTemplate = function() {
       $location.path("templates/" + $scope.selected_template); 
    };
   
    /**
        Read all the templates for use in the select element 
    */ 
    templatesService.read()
        .success(function(data, status, headers, config) {
            $scope.templates = data;

            $scope.options = [];
            for (var i = 0; i < data.length; i++) {
                $scope.options.push({
                    name: data[i].name,
                    value: data[i].id
                });
            }

            $scope.selected_template = $scope.options[0].value;
            $scope.selectTemplate();
        });
});
