<div class="page_title">
    Blog
</div>

<div ng-show="isAdmin"> 
    Title:<br>
    <textarea ng-model="new_title"></textarea><br>
    Html:<br>
    <textarea ng-model="new_html"></textarea><br>
    <button ng-click="post()">Post</button>
</div>

<div class="post" ng-repeat="post in posts">
    <button ng-show="isAdmin && !post.isEditMode" ng-click="edit(post)">Edit</button>

    <textarea ng-show="post.isEditMode" ng-model="post.edit_title"></textarea>
    <div ng-hide="post.isEditMode" class="title">{{post.title}}</div>

    <div class="date"> 
        {{post.date}} 
    </div>

    <textarea ng-show="post.isEditMode" ng-model="post.edit_html" style="display: block;"></textarea>
    <div ng-hide="post.isEditMode" class="body" ng-bind-html="post.html"></div>

    <button ng-show="post.isEditMode" ng-click="save(post)">Save</button>
    <button ng-show="post.isEditMode" ng-click="cancel(post)">Cancel</button>
</div>