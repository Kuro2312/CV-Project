var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	
	$http({
    method : "GET",
    url : "js/data.json"
	}).then(function mySucces(response) {
		$scope.aglFullName = response.data.FullName;

		$scope.aglJob = response.data.Job;
		$scope.aglPhone = response.data.Phone;
		$scope.aglEmail = response.data.Email;
		$scope.aglAddress = response.data.Address;
		$scope.aglNation = response.data.Nation;
		$scope.aglMoreDetailAboutAddress = response.data.MoreDetailAboutAddress;
		$scope.aglProfile = "images/profile1.png";
		$scope.aglProfile = response.data.ProfileImage;
		
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
  
	$http({
    method : "GET",
    url : "js/data1.json"
	}).then(function mySucces(response1) {
		$scope.aglSkillCatalog = response1.data.SkillCatalog;
		$scope.aglInterestCatalog = response1.data.InterestCatalog;
	}, function myError(response1) {
      $scope.aglFullName = response1.statusText;
	});
  
  
  	$scope.aglFullName = "Kuro";
	populateCountries("country", "state");
	populateNationalities("nationality");
	
    $scope.LoadSessionData = function(val) {
        console.log(val);
    }
	
	
	
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
	
	$scope.RemoveSkill = function(index){
		$scope.aglSkills.splice(index, 1); 
	}
	
	$scope.AddSkill = function(){
		$scope.aglSkills.push($scope.SelectedDoctor);
	}
	
	$scope.RemoveInterest = function(index){
		$scope.aglInterests.splice(index, 1); 
	}
	
	$scope.AddInterest = function(){
		$scope.aglInterests.push($scope.SelectedDoctor1);
	}
});