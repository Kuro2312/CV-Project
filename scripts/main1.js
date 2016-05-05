var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $http({
    method : "GET",
    url : "data/data.json"
  }).then(function mySucces(response) {
		$scope.aglFullName = response.data.FullName;

		$scope.aglJob = response.data.Job;
		$scope.aglPhone = response.data.Phone;
		$scope.aglEmail = response.data.Email;
		$scope.aglAddress = response.data.Address;
		$scope.aglNation = response.data.Nation;
		$scope.aglMoreDetailAboutAddress = response.data.MoreDetailAboutAddress;
		$scope.aglProfileImage = response.data.ProfileImage;
		
		$scope.aglHeaders = response.data.Headers;
		
		$scope.aglSummary = response.data.Summary;

		$scope.aglEducation = response.data.Education;

		$scope.aglSkills = response.data.Skills;

		$scope.aglInterests = response.data.Interests;

		$scope.aglLanguages = response.data.Languages;

		$scope.aglProjects = response.data.Projects;
		
    }, function myError(response) {
      $scope.aglFullName = response.statusText;
  });
  
  $scope.myFunc = function () 
  {

		// Writing it to the server
		//		
		var dataObj = {

				FullName : $scope.newSkill
		};	
		var res = $http.post('data/data.json', dataObj);
		res.success(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
  }
});