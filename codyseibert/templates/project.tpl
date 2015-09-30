<div class="back_wrapper">
	<a ng-click="back()" class="back">&lt; Back</a>
</div>

<div style="margin-bottom: 10px;"></div>

<div ng-show="isAdmin">
    Title: <input ng-model="edit_title" />
    Img: <input ng-model="edit_img" />
    Html: <input ng-model="edit_html" />
    Type: <input ng-model="edit_type" />
    <button ng-click="update()">Update</button>
</div>

<div id="project_div" ng-bind-html="html">
</div>