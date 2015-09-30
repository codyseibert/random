<div style="position: absolute; z-index: 10;">
    <select ng-model="selected_template" ng-change="selectTemplate()" ng-options="option.value as option.name for option in options">
    </select>
    <button ng-click="editTemplate()">Edit</button>
    <button ng-click="newTemplate()">New</button>
</div>

<div class="wrapper" ng-style="{'height': centerY * 2 + 'px'}" style="width: 100%;">
    <div class="time" ng-style="{'top': offset + 'px'}">
        <div class="task" ng-repeat="task in tasks" ng-style="{'top': task.offset + 'px', 'height': task.height + 'px'}">
            <div class="text" ng-style="{'height': task.height + 'px'}">
                {{task.text}}
            </div>
        </div>

        <div class="line" ng-repeat="line in lines" ng-style="{'top': line.offset + 'px'}">
            ----------- {{line.text}} -----------
        </div>
    </div>
</div>

<div class="marker" ng-style="{'top': centerY - 38 + 'px'}">
    <img src="images/arrow.png">
</div>
