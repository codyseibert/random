<div class="page_title">
    Admin Login
</div>

<span ng-show="invalid">Invalid Login!</span> 
<br />
Username: <input ng-model="username" /><br />
Password: <input type="password" ng-model="password" /><br />
<button ng-click="login()">Login</button>