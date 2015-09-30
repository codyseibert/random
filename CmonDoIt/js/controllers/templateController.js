angular.module('doit')
.controller('templateController', function TemplateController($scope, templatesService, tasksService, $routeParams, $window) {
	'use strict';

    var id = $routeParams.id;

    templatesService.readTasks(id)
        .success(function(data, status, headers, config) {
            $scope.tasks = data;
        });

    templatesService.readById(id)
        .success(function(data, status, headers, config){
            $scope.name = data.name;
        });

    /**
        Update the template
    */
    $scope.save = function() {
        var dto = {
            id: id,
            name: $scope.name
        };
        templatesService.update(dto)
            .success(function(data, status, headers, config){
                
            });
    };

    /**
        Add a task to the template
    */
    $scope.createTask = function() {
        var task = {
            template_id: id,
            text: $scope.text,
            start_time: $scope.start_time,
            end_time: $scope.end_time
        };

        tasksService.create(task)
            .success(function(data, status, headers, config){
                $scope.tasks.push(data);
            });
    };

    /**
        Delete a task
    */
    $scope.deleteTask = function(task) {
        tasksService.delete(task.id)
            .success(function(data, status, headers, config){
                for (var i = 0; i < $scope.tasks.length; i++){
                    if ($scope.tasks[i].id == task.id) {
                        $scope.tasks.splice(i, 1);
                        break;
                    }
                }
            });
    }

    $scope.back = function() {
        $window.history.back();
    };
});
