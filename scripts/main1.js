var app = angular.module("myApp", ["firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://cv-1312094.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);

app.controller("myCtrl", ["$scope", "$firebaseObject", "Auth",
	function($scope, $firebaseObject, Auth) {
		
		$scope.CheckLogin = function()
		{
			var user = Auth.$getAuth();
						
			if (user == null)
				window.location.href = "login.html";
			
			//alert("Authenticated user with uid:" + user.uid);
		}
		
		$scope.LogOut = function()
		{
			Auth.$unauth();
			
			var user = Auth.$getAuth();
						
			if (user == null)
				window.location.href = "login.html";
		}	
		
		$scope.CheckLogin();
		
		var ref = new Firebase("https://cv-1312094.firebaseio.com/web/saving-data/fireblog/users");
	
		$scope.aglUser = $firebaseObject(ref);
	
		
	}
]);

