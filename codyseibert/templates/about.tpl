<div class="page_title">
    About Me
</div>

<div ng-show="isAdmin">
    Html:<br>
    <textarea ng-model="new_html"></textarea><br>
    <button ng-click="save()">Save</button>
</div>

<div id="about_div" ng-bind-html="html">
</div>

<div>
	<a href="#/login">Admin Login</a>
</div>