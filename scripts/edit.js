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
		$scope.aglAddressNation = response.data.AddressNation;
		$scope.aglAddressState = response.data.AddressState;
		$scope.aglNationality = response.data.Nationality;
		$scope.aglMoreDetailAboutAddress = response.data.MoreDetailAboutAddress;

		$scope.aglProfile = response.data.ProfileImage;
		
		$scope.aglHeaders = response.data.Headers;
		
		$scope.aglSummary = response.data.Summary;

		$scope.aglEducation = response.data.Education;

		$scope.aglSkills = response.data.Skills;

		$scope.aglExperience = response.data.Experience;
		
		$scope.aglInterests = response.data.Interests;

		$scope.aglLanguages = response.data.Languages;

		$scope.aglProjects = response.data.Projects;
		
    }, function myError(response) {
      $scope.aglFullName = response.statusText;
	});
  
	$http({
    method : "GET",
    url : "data/publicData.json"
	}).then(function mySucces(response1) {
		$scope.aglSkillCatalog = response1.data.SkillCatalog;
		$scope.aglInterestCatalog = response1.data.InterestCatalog;
	}, function myError(response1) {
		$scope.aglFullName = response1.statusText;
	});
  
	$http({
    method : "GET",
    url : "data/WorldData.json"
	}).then(function mySucces(response2) {
		$scope.aglCountries = response2.data.Countries;
		$scope.aglStates = response2.data.States;
		$scope.aglNationalities = response2.data.Nationalities;
		
		var ind = $scope.aglCountries.indexOf( $scope.aglAddressNation );
		$scope.aglSelectedStates = $scope.aglStates[ind].split("|");
	}, function myError(response2) {
		$scope.aglFullName = response2.statusText;
	});

	$http({
    method : "GET",
    url : "data/LanguageData.json"
	}).then(function mySucces(response3) {
		$scope.aglLanguageList = response3.data;
	}, function myError(response3) {
		$scope.aglFullName = response3.statusText;
	});
	
	$scope.aglMonthList = 
	[
		{name : "Jan", id : 1},
		{name : "Feb", id : 2},
		{name : "Mar", id : 3},
		{name : "Apr", id : 4},
		{name : "May", id : 5},
		{name : "Jun", id : 6},
		{name : "Jul", id : 7},
		{name : "Aug", id : 8},
		{name : "Sep", id : 9},
		{name : "Oct", id : 10},
		{name : "Nov", id : 11},
		{name : "Dec", id : 12}
	];
		
	$scope.aglYearList = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	$scope.aglLevelList = ["Native", "Professional", "Fluent", "Communicable", "Quite Good"];
	$scope.aglProgrammingLanguages = ["C", "C++", "C#", "Java", "Object C", "PHP", "Assemly"];
	
	$scope.UpdateState = function() {
		var ind = $scope.aglCountries.indexOf( $scope.aglSelectedCountry );
		$scope.aglSelectedStates = $scope.aglStates[ind].split("|");
	}
	
    $scope.LoadSessionData = function(val) {
        console.log(val);
    }
	
	/*bkLib.onDomLoaded(function() { 
		//nicEditors.allTextAreas()
		new nicEditor({fullPanel : true}).panelInstance('area1');	
	});*/
	
	
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
		if ($scope.SelectedDoctor == null)
			return;
		
		var n = $scope.aglSkills.length;
		for (var i = 0; i < n; i++)
			if ($scope.SelectedDoctor == $scope.aglSkills[i])
				return;
			
		$scope.aglSkills.push($scope.SelectedDoctor);
	}
	
	$scope.RemoveInterest = function(index){
		$scope.aglInterests.splice(index, 1); 
	}
	
	$scope.AddInterest = function(){
		
		if ($scope.SelectedDoctor1 == null)
			return;
		
		var n = $scope.aglInterests.length;
		for (var i = 0; i < n; i++)
			if ($scope.SelectedDoctor1 == $scope.aglInterests[i])
				return;
		
		$scope.aglInterests.push($scope.SelectedDoctor1);
	}
	
	$scope.AddLanguage = function()
	{
		var n = $scope.aglLanguages.length;
		for (var i = 0; i < n; i++)
			if ($scope.aglLanguage == $scope.aglLanguages[i].name)
			{
				$scope.aglDuplicatedLangError = "Error: Existed Language";
				return ;
			}
			
		if (!($scope.aglLanguage != null && $scope.aglLevel != null))
		{
			$scope.aglDuplicatedLangError = "Error: Empty Data! Please check again!";
			return;
		}

		$scope.aglLanguages.push({name : $scope.aglLanguage, summary : $scope.aglLevel});
		$scope.aglDuplicatedLangError = "";
	}
	
	$scope.RemoveLanguage = function(index){
		$scope.aglLanguages.splice(index, 1); 
		$scope.SelectedLangIndex = -1;
		$scope.flag1 = ! $scope.flag1;
		$scope.aglIsUpdating = false;
	}
	
	$scope.EditLanguage = function(index){
		$scope.aglLanguage = $scope.aglLanguages[index].name;
		$scope.aglLevel = $scope.aglLanguages[index].summary;
		$scope.flag1 = ! $scope.flag1;
		$scope.SelectedLangIndex = index;
		$scope.aglIsUpdating = true;
		$scope.flag2 = true;
	}
	
	$scope.UpdateLanguage = function(){
	
		$scope.aglLanguages[$scope.SelectedLangIndex ].summary = $scope.aglLevel;
		
		$scope.aglLanguage = "";
		$scope.aglLevel = "";
		
		$scope.aglIsUpdating = false;
		$scope.flag1 = ! $scope.flag1;
	}
	
	$scope.RemoveProject = function(index){
		$scope.aglProjects.splice(index, 1); 
		$scope.SelectedProIndex = -1;
		$scope.flag4 = ! $scope.flag4;
		$scope.aglProNameChecked = false;
		$scope.ResetProjectData();
		$scope.aglProjectError = "";
	}
	
	$scope.EditProject = function(index){
		
		$scope.aglProNameChecked = true;
		$scope.showDetails3 = true;
		$scope.flag4 = true;
		$scope.SelectedProIndex = index;	
		
		$scope.aglProName = $scope.aglProjects[index].name;
		$scope.aglProLang = $scope.aglProjects[index].language;
		$scope.aglProSummary = $scope.aglProjects[index].summary;
		
		var time = $scope.aglProjects[index].period.split(" - ");
		var sTime = time[0].split(" ");
		var eTime = time[1].split(" ");
		
		$scope.aglProStartMonth = sTime[0];
		$scope.aglProEndMonth = eTime[0];
		$scope.aglProStartYear = sTime[1];
		$scope.aglProEndYear = eTime[1];
	}
	
	$scope.UpdateProject = function(){
		
		$scope.CheckProjectData();
		if ($scope.aglProjectError != "")
			return;
		
		var per = $scope.aglProStartMonth + " " + $scope.aglProStartYear + " - ";
		per = per + $scope.aglProEndMonth + " " + $scope.aglProEndYear;
		
		var ind = $scope.SelectedProIndex;
		
		$scope.aglProjects[ind].language = $scope.aglProLang;
		$scope.aglProjects[ind].period = per;
		$scope.aglProjects[ind].summary = $scope.aglProSummary;
		
		
		$scope.flag4 = ! $scope.flag4;
		$scope.aglProNameChecked = false;
		$scope.ResetProjectData();
		$scope.aglProjectError = "";
	}
	
	$scope.AddProject = function(){
		
		$scope.CheckProjectData();
		if ($scope.aglProjectError != "")
			return;
		

		var per = $scope.aglProStartMonth + " " + $scope.aglProStartYear + " - ";
		per = per + $scope.aglProEndMonth + " " + $scope.aglProEndYear;
		var newPro = 
		{
			name : $scope.aglProName,
			language : $scope.aglProLang,
			period : per,
			summary : $scope.aglProSummary
		}
		
		$scope.aglProjects.push (newPro);
		
		$scope.ResetProjectData();
		$scope.aglProjectError = "";
	}
	
	$scope.ResetProjectData = function()
	{
		$scope.aglProName = null;
		$scope.aglProLang = null;
		$scope.aglProSummary = null;
		$scope.aglProStartMonth = null;
		$scope.aglProEndMonth = null;
		$scope.aglProStartYear = null;
		$scope.aglProEndYear = null;
	}
	
	$scope.CheckProjectData = function()
	{
		$scope.aglProjectError = "";
		if ($scope.aglProName == null)
		{
			$scope.aglProjectError = "Error: Empty Name!";
			return;
		}

		if ($scope.aglProStartYear == null || $scope.aglProStartMonth == null || $scope.aglProEndYear == null || $scope.aglProEndMonth == null)
		{
			$scope.aglProjectError = "Error: Invalid Period!";
			return;
		}

		if ($scope.aglProStartYear > $scope.aglProEndYear)
		{
			$scope.aglProjectError = "Error: Invalid Period!";
			return;
		}	
		
		var n = $scope.aglMonthList.length;
		var ind1 = -1;
		var ind2 = -1;
		
		for (var i = 0; i < n; i++)
		{
			if ($scope.aglProStartMonth == $scope.aglMonthList[i].name)
				ind1 = i;
			if ($scope.aglProEndMonth == $scope.aglMonthList[i].name)
				ind2 = i;
		}
		
		if ($scope.aglProStartYear == $scope.aglProEndYear && ind1 > ind2)
		{
			$scope.aglProjectError = "Error: Invalid Period!";
			return;
		}
		
		if ($scope.aglProSummary == null)
		{
			$scope.aglProjectError = "Error: Empty Decription!";
			return;
		}
	}
	
	$scope.ResetEducationData = function()
	{
		$scope.aglSchoolName = null;
		$scope.aglMajor = null;
		$scope.aglEduStartMonth = null;
		$scope.aglEduStartYear = null;
		$scope.aglEduEndMonth = null;
		$scope.aglEduEndYear = null;
		$scope.aglSelectedEduCountry = null;
		$scope.aglSelectedEduState = null;
	}
	
	$scope.RemoveEducation = function(index){
		$scope.aglEducation.splice(index, 1); 
		$scope.SelectedEduIndex = -1;
		$scope.flag6 = ! $scope.flag6;	
		$scope.aglEduNameChecked = false;
		
		$scope.ResetEducationData();
		$scope.aglEducationError = "";
	}
	
	$scope.EditEducation = function(index){
		
		$scope.aglEduNameChecked = true;
		$scope.showDetails1 = true;
		$scope.flag6 = true;
		$scope.SelectedEduIndex = index;	
		
		$scope.aglSchoolName = $scope.aglEducation[index].university;
		$scope.aglMajor = $scope.aglEducation[index].major;
		$scope.aglEduLogo = $scope.aglEducation[index].logo;
		
		var time = $scope.aglEducation[index].period.split(" - ");
		var sTime = time[0].split(" ");
		var eTime = time[1].split(" ");
		
		$scope.aglEduStartMonth = sTime[0];
		$scope.aglEduEndMonth = eTime[0];
		$scope.aglEduStartYear = sTime[1];
		$scope.aglEduEndYear = eTime[1];
		
		var address = $scope.aglEducation[index].address.split(", ");
		$scope.aglSelectedEduCountry = address[1];
		
		var ind = $scope.aglCountries.indexOf( $scope.aglSelectedEduCountry );
		$scope.aglSelectedEduStates = $scope.aglStates[ind].split("|");
		$scope.aglSelectedEduState = address[0];	
	}
	
	$scope.UpdateEducation = function(){
		
		$scope.CheckEduData();
		if ($scope.aglEducationError != "")
			return;

		var per = $scope.aglEduStartMonth + " " + $scope.aglEduStartYear + " - ";
		per = per + $scope.aglEduEndMonth + " " + $scope.aglEduEndYear;
		
		var ind = $scope.SelectedEduIndex;
		
		$scope.aglEducation[ind].major = $scope.aglMajor;
		$scope.aglEducation[ind].period = per;
		$scope.aglEducation[ind].logo = $scope.aglEduLogo;
		$scope.aglEducation[ind].address = $scope.aglSelectedEduState + ", " + $scope.aglSelectedEduCountry;
		
		$scope.flag6 = ! $scope.flag6;
		$scope.aglEduNameChecked = false;
		
		$scope.ResetEducationData();
		$scope.aglEducationError = "";
	}
	
	$scope.AddEducation = function(){
		
		$scope.CheckEduData();
		if ($scope.aglEducationError != "")
			return;
		

		var per = $scope.aglEduStartMonth + " " + $scope.aglEduStartYear + " - ";
		per = per + $scope.aglEduEndMonth + " " + $scope.aglEduEndYear;

		var newEdu = 
		{
			university : $scope.aglSchoolName,
			major : $scope.aglMajor,
			period : per,
			address : $scope.aglSelectedEduState + ", " + $scope.aglSelectedEduCountry,
			logo : ""
		}
		
		$scope.aglEducation.push (newEdu);
		
		$scope.ResetEducationData();
		$scope.aglEducationError = "";
	}
	
	$scope.CheckEduData = function()
	{
		$scope.aglEducationError = "";
		if ($scope.aglSchoolName == null)
		{
			$scope.aglEducationError = "Error: Empty Name!";
			return;
		}

		if ($scope.aglMajor == null)
		{
			$scope.aglEducationError = "Error: Empty Major!";
			return;
		}	
		
		if ($scope.aglEduStartYear == null || $scope.aglEduStartMonth == null || $scope.aglEduEndYear == null || $scope.aglEduEndMonth == null)
		{
			$scope.aglEducationError = "Error: Invalid Period!";
			return;
		}

		if ($scope.aglEduStartYear > $scope.aglEduEndYear)
		{
			$scope.aglEducationError = "Error: Invalid Period!";
			return;
		}	
		
		var n = $scope.aglMonthList.length;
		var ind1 = -1;
		var ind2 = -1;
		
		for (var i = 0; i < n; i++)
		{
			if ($scope.aglEduStartMonth == $scope.aglMonthList[i].name)
				ind1 = i;
			if ($scope.aglEduEndMonth == $scope.aglMonthList[i].name)
				ind2 = i;
		}
		
		if ($scope.aglEduStartYear == $scope.aglEduEndYear && ind1 > ind2)
		{
			$scope.aglEducationError = "Error: Invalid Period!";
			return;
		}
				
		if ($scope.aglSelectedEduCountry == null || $scope.aglSelectedEduState == null)
		{
			$scope.aglEducationError = "Error: Empty Address!";
			return;
		}
	}
	
	$scope.UpdateState1 = function() {
		var ind = $scope.aglCountries.indexOf( $scope.aglSelectedEduCountry );
		$scope.aglSelectedEduStates = $scope.aglStates[ind].split("|");
	}
	
	
	$scope.ResetExperienceData = function()
	{
		$scope.aglCompanyName = null;
		$scope.aglTitle = null;
		$scope.aglExpStartMonth = null;
		$scope.aglExpStartYear = null;
		$scope.aglExpEndMonth = null;
		$scope.aglExpEndYear = null;
		$scope.aglExperienceDecription = null;
	}
	
	$scope.RemoveExperience = function(index){
		$scope.aglExperience .splice(index, 1); 
		$scope.SelectedExpIndex = -1;
		$scope.flag5 = ! $scope.flag5;
		
		$scope.aglExpNameChecked = false;
		$scope.ResetExperienceData();
		$scope.aglExperienceError = "";
	}
	
	$scope.EditExperience  = function(index){

		$scope.aglExpNameChecked = true;
		$scope.showDetails2 = true;
		$scope.flag5 = true;
		$scope.SelectedExpIndex = index;		
		
		$scope.aglCompanyName = $scope.aglExperience[index].company;
		$scope.aglTitle = $scope.aglExperience[index].title;
		$scope.aglExperienceDecription = $scope.aglExperience[index].summary;
		
		var time = $scope.aglExperience[index].period.split(" - ");
		var sTime = time[0].split(" ");
		var eTime = time[1].split(" ");
		
		$scope.aglExpStartMonth = sTime[0];
		$scope.aglExpEndMonth = eTime[0];
		$scope.aglExpStartYear = sTime[1];
		$scope.aglExpEndYear = eTime[1];
	}
	
	$scope.UpdateExperience = function(){
		
		$scope.CheckExpData();
		if ($scope.aglExperienceError != "")
			return;

		var per = $scope.aglExpStartMonth + " " + $scope.aglExpStartYear + " - ";
		per = per + $scope.aglExpEndMonth + " " + $scope.aglExpEndYear;
		
		var ind = $scope.SelectedExpIndex;
		
		$scope.aglExperience[ind].title = $scope.aglTitle;
		$scope.aglExperience[ind].period = per;
		$scope.aglExperience[ind].summary = $scope.aglExperienceDecription;
		
		$scope.flag5 = ! $scope.flag5;
		$scope.aglExpNameChecked = false;
		
		$scope.ResetExperienceData();
		$scope.aglExperienceError = "";
	}
	
	$scope.AddExperience = function(){
		
		$scope.CheckExpData();
		if ($scope.aglExperienceError != "")
			return;
		
		var per = $scope.aglExpStartMonth + " " + $scope.aglExpStartYear + " - ";
		per = per + $scope.aglExpEndMonth + " " + $scope.aglExpEndYear;

		var newExp = 
		{
			company : $scope.aglCompanyName,
			title : $scope.aglTitle,
			period : per,
			summary : $scope.aglExperienceDecription
		}
		
		$scope.aglExperience.push (newExp);
		
		$scope.ResetExperienceData();
		$scope.aglExperienceError = "";
	}
	
	$scope.CheckExpData = function()
	{
		$scope.aglExperienceError = "";
		if ($scope.aglCompanyName == null)
		{
			$scope.aglExperienceError = "Error: Empty Name!";
			return;
		}

		if ($scope.aglTitle == null)
		{
			$scope.aglExperienceError = "Error: Empty Title!";
			return;
		}	
		
		if ($scope.aglExpStartYear == null || $scope.aglExpStartMonth == null || $scope.aglExpEndYear == null || $scope.aglExpEndMonth == null)
		{
			$scope.aglExperienceError = "Error: Invalid Period!";
			return;
		}

		if ($scope.aglExpStartYear > $scope.aglExpEndYear)
		{
			$scope.aglExperienceError = "Error: Invalid Period!";
			return;
		}	
		
		var n = $scope.aglMonthList.length;
		var ind1 = -1;
		var ind2 = -1;
		
		for (var i = 0; i < n; i++)
		{
			if ($scope.aglExpStartMonth == $scope.aglMonthList[i].name)
				ind1 = i;
			if ($scope.aglExpEndMonth == $scope.aglMonthList[i].name)
				ind2 = i;
		}
		
		if ($scope.aglExpStartYear == $scope.aglExpEndYear && ind1 > ind2)
		{
			$scope.aglExperienceError = "Error: Invalid Period!";
			return;
		}
		
		if ($scope.aglExperienceDecription == null)
		{
			$scope.aglExperienceError = "Error: Empty Decription!";
			return;
		}
	}
	
});