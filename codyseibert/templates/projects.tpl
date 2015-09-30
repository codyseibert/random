<div class="page_title">
    {{type}}
</div>

<div ng-show="isAdmin">
Title: <input ng-model="new_title"></input><br>
Image: <input ng-model="new_img"></input><br>
Html: <input ng-model="new_html"></input><br>
<button ng-click="create()">Post</button>
</div>

<div class="project" ng-repeat="project in projects">
	<div class="triangle">
	    
	</div>

	<div class="c" ng-click="navigateTo(project.id)">
	    <div>
	        <span>{{project.title}}</span>
	    </div>
	    <div>
	        <img ng-src="{{project.img}}">
	    </div>
	</div>
</div>