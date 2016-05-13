var app = angular.module("myApp", ["firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://cv-1312094.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);


app.controller("myCtrl", ["$scope", "Auth", "$location",
	function($scope, Auth, $location) {
	
		$scope.aglError = null;
		$scope.aglUserName = null;
		$scope.aglPass = null;
		
		$scope.SignUp = function()
		{		
			$scope.aglError = null;
			if ($scope.aglUserName == null || $scope.aglUserName == "")
				$scope.aglError = "Empty Username!"
			else if ($scope.aglPass == null || $scope.aglPass == "")
				$scope.aglError = "Empty Password!"
			
			if ($scope.aglError != null)
				return;
			
			Auth.$createUser({
				email    : $scope.aglUserName,
				password : $scope.aglPass
			}).then(function(userData) {
				alert("Success");

				Auth.$authWithPassword({
				email    : $scope.aglUserName,
				password : $scope.aglPass
				}).then(function(authData) {
					$scope.aglUserName = null;
					$scope.aglPass = null;
					$scope.aglFlag = true;
					window.location.href = "index.html";
				}).catch(function(error) {
					$scope.GetError(error);
				});
				
			}).catch(function(error) {
				$scope.GetError(error);
			});
		}
	  
		$scope.SignIn = function()
		{
			$scope.aglError = null;
			if ($scope.aglUserName == null || $scope.aglUserName == "")
				$scope.aglError = "Empty Username!"
			else if ($scope.aglPass == null || $scope.aglPass == "")
				$scope.aglError = "Empty Password!"
			
			if ($scope.aglError != null)
				return;
			
			Auth.$authWithPassword({
				email    : $scope.aglUserName,
				password : $scope.aglPass
			}).then(function(authData) {
				$scope.aglUserName = null;
				$scope.aglPass = null;
				$scope.aglFlag = true;
				window.location.href = "index.html";
			}).catch(function(error) {
				$scope.GetError(error);
			});
		}
		
		$scope.GetError = function(error)
		{
			$scope.aglError = null;

			if (error.code == "INVALID_USER")
				$scope.aglError = "Wrong username!";
			else if (error.code == "INVALID_PASSWORD")
				$scope.aglError = "Wrong password!";
			else if (error.code == "INVALID_EMAIL")
				$scope.aglError = "Invalid email!";
			else if (error.code == "EMAIL_TAKEN")
				$scope.aglError = "Email's used!";
		}
		
		$scope.CheckLogin = function()
		{
			var user = Auth.$getAuth();
			
			if (user == null)
				window.location.href = "login.html";
		}
	}
]);

