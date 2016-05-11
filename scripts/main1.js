var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", ["$scope", "$firebaseObject",
  function($scope, $firebaseObject) {
    var ref = new Firebase("https://cv-1312094.firebaseio.com/web/saving-data/fireblog/users");
	
	$scope.aglUser = $firebaseObject(ref);
  }
  
 
]


);

