<span ng-click="back()">&lt;Back</span>
<br>
Name: <input ng-model="name"></input>
<br>
Text: <input ng-model="text"></input>
Start Time:<input ng-model="start_time"></input>
End Time:<input ng-model="end_time"></input>
<button ng-click="createTask()">Add Task</button>

<div ng-repeat="task in tasks track by task.id">
    {{task.text}} {{task.start_time}} {{task.end_time}}
    <button ng-click="deleteTask(task)">Delete</button>
</div>

<button ng-click="save()">Save</button>


