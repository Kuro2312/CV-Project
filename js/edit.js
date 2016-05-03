var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.aglProfile = "images/profile1.png";
	
    $scope.imageUpload = function(element){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(element.files[0]);
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.aglProfile = e.target.result;
        });
    }
});