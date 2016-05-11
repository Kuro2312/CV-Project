var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", ["$scope", "$firebaseObject",
	function($scope, $firebaseObject) {
	  
		$scope.initData = function()
		{
			// Lấy dữ liệu của user
			var ref = new Firebase("https://cv-1312094.firebaseio.com/web/saving-data/fireblog/users");	
			$scope.aglUser = $firebaseObject(ref);
			//var userRef = = $firebaseObject(ref);
			//userRef.$bindTo($scope, "aglUser");
			
			// Lấy dữ liệu thông tin chung
			ref = new Firebase("https://cv-1312094.firebaseio.com/web/saving-data/fireblog/publicInformation");	
			$scope.aglPublicData = $firebaseObject(ref);
			
			// Lấy dữ liệu cho quốc gia, quốc tịch, vùng/thành phố
			ref = new Firebase("https://cv-1312094.firebaseio.com/web/saving-data/fireblog/worldData");	
			$scope.aglWorldData = $firebaseObject(ref);
	
			// Lấy dữ liệu cho ngôn ngữ 
			ref = new Firebase("https://cv-1312094.firebaseio.com/web/saving-data/fireblog/languageData");	
			$scope.aglLanguageData = $firebaseObject(ref);
			
			//var ind = $scope.aglWorldData.Countries.indexOf( $scope.aglSelectedCountry );
		}
		
		
		// Khởi tạo dữ liệu
		$scope.initData();
				
		$scope.UpdateState = function() {
			var ind = $scope.aglWorldData.Countries.indexOf( $scope.aglSelectedCountry );
			$scope.aglSelectedStates = $scope.aglWorldData.States[ind].split("|");
		}
		
		$scope.LoadSessionData = function(val) {
			console.log(val);
		}
		
		
		$scope.imageUpload = function(element){
			var reader = new FileReader();
			reader.onload = $scope.imageIsLoaded;
			reader.readAsDataURL(element.files[0]);
			
			$scope.SaveData();
		}

		$scope.imageIsLoaded = function(e){
			$scope.$apply(function() {
				$scope.aglUser.ProfileImage = e.target.result;
			});
		}
		
		$scope.RemoveSkill = function(index){
			$scope.aglUser.Skills.splice(index, 1); 
			
			$scope.SaveData();
		}
		
		$scope.AddSkill = function(){
			if ($scope.SelectedDoctor == null || $scope.SelectedDoctor == "")
				return;
			
			var n = $scope.aglUser.Skills.length;
			for (var i = 0; i < n; i++)
				if ($scope.SelectedDoctor == $scope.aglUser.Skills[i])
					return;
				
			$scope.aglUser.Skills.push($scope.SelectedDoctor);
			
			$scope.SaveData();
		}
		
		$scope.RemoveInterest = function(index){
			$scope.aglUser.Interests.splice(index, 1); 
			
			$scope.SaveData();
		}
		
		$scope.AddInterest = function(){
			
			if ($scope.SelectedDoctor1 == null || $scope.SelectedDoctor == "")
				return;
			
			var n = $scope.aglUser.Interests.length;
			for (var i = 0; i < n; i++)
				if ($scope.SelectedDoctor1 == $scope.aglUser.Interests[i])
					return;
			
			$scope.aglUser.Interests.push($scope.SelectedDoctor1);
			
			$scope.SaveData();
		}
		
		$scope.AddLanguage = function()
		{
			var n = $scope.aglUser.Languages.length;
			for (var i = 0; i < n; i++)
				if ($scope.aglLanguage == $scope.aglUser.Languages[i].name)
				{
					$scope.aglDuplicatedLangError = "Error: Existed Language";
					return ;
				}
				
			if ($scope.aglLanguage == "" || $scope.aglLanguage == null || $scope.aglLevel == null || $scope.aglLevel == "")
			{
				$scope.aglDuplicatedLangError = "Error: Empty Data! Please check again!";
				return;
			}

			$scope.aglUser.Languages.push({name : $scope.aglLanguage, summary : $scope.aglLevel});
			$scope.aglDuplicatedLangError = "";
			
			$scope.SaveData();
		}
		
		$scope.RemoveLanguage = function(index){
			$scope.aglUser.Languages.splice(index, 1); 
			$scope.SelectedLangIndex = -1;
			$scope.flag1 = ! $scope.flag1;
			$scope.aglIsUpdating = false;
			
			$scope.SaveData();
		}
		
		$scope.EditLanguage = function(index){
			$scope.aglLanguage = $scope.aglUser.Languages[index].name;
			$scope.aglLevel = $scope.aglUser.Languages[index].summary;
			$scope.flag1 = true;
			$scope.SelectedLangIndex = index;
			$scope.aglIsUpdating = true;
			$scope.flag2 = true;
		}
		
		$scope.UpdateLanguage = function(){
		
			$scope.aglUser.Languages[$scope.SelectedLangIndex ].summary = $scope.aglLevel;
			
			$scope.aglLanguage = "";
			$scope.aglLevel = "";
			
			$scope.aglIsUpdating = false;
			$scope.flag1 = ! $scope.flag1;
			
			$scope.SaveData();
		}
		
		$scope.RemoveProject = function(index){
			$scope.aglUser.Projects.splice(index, 1); 
			$scope.SelectedProIndex = -1;
			$scope.flag4 = ! $scope.flag4;
			$scope.aglProNameChecked = false;
			$scope.ResetProjectData();
			$scope.aglProjectError = "";
			
			$scope.SaveData();
		}
		
		$scope.EditProject = function(index){
			
			$scope.aglProNameChecked = true;
			$scope.showDetails3 = true;
			$scope.flag4 = true;
			$scope.SelectedProIndex = index;	
			
			$scope.aglProName = $scope.aglUser.Projects[index].name;
			$scope.aglProLang = $scope.aglUser.Projects[index].language;
			$scope.aglProSummary = $scope.aglUser.Projects[index].summary;
			
			var time = $scope.aglUser.Projects[index].period.split(" - ");
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
			
			$scope.aglUser.Projects[ind].language = $scope.aglProLang;
			$scope.aglUser.Projects[ind].period = per;
			$scope.aglUser.Projects[ind].summary = $scope.aglProSummary;
			
			
			$scope.flag4 = ! $scope.flag4;
			$scope.aglProNameChecked = false;
			$scope.ResetProjectData();
			$scope.aglProjectError = "";
			
			$scope.SaveData();
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
			
			$scope.aglUser.Projects.push (newPro);
			
			$scope.ResetProjectData();
			$scope.aglProjectError = "";
			
			$scope.SaveData();
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
			if ($scope.aglProName == null || $scope.aglProName == "")
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
			
			var n = $scope.aglPublicData.MonthList.length;
			var ind1 = -1;
			var ind2 = -1;
			
			for (var i = 0; i < n; i++)
			{
				if ($scope.aglProStartMonth == $scope.aglPublicData.MonthList[i].name)
					ind1 = i;
				if ($scope.aglProEndMonth == $scope.aglPublicData.MonthList[i].name)
					ind2 = i;
			}
			
			if ($scope.aglProStartYear == $scope.aglProEndYear && ind1 > ind2)
			{
				$scope.aglProjectError = "Error: Invalid Period!";
				return;
			}
			
			if ($scope.aglProSummary == null || $scope.aglProSummary == "")
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
			$scope.aglUser.Education.splice(index, 1); 
			$scope.SelectedEduIndex = -1;
			$scope.flag6 = ! $scope.flag6;	
			$scope.aglEduNameChecked = false;
			
			$scope.ResetEducationData();
			$scope.aglEducationError = "";
			
			$scope.SaveData();
		}
		
		$scope.EditEducation = function(index){
			
			$scope.aglEduNameChecked = true;
			$scope.showDetails1 = true;
			$scope.flag6 = true;
			$scope.SelectedEduIndex = index;	
			
			$scope.aglSchoolName = $scope.aglUser.Education[index].university;
			$scope.aglMajor = $scope.aglUser.Education[index].major;
			$scope.aglEduLogo = $scope.aglUser.Education[index].logo;
			
			var time = $scope.aglUser.Education[index].period.split(" - ");
			var sTime = time[0].split(" ");
			var eTime = time[1].split(" ");
			
			$scope.aglEduStartMonth = sTime[0];
			$scope.aglEduEndMonth = eTime[0];
			$scope.aglEduStartYear = sTime[1];
			$scope.aglEduEndYear = eTime[1];
			
			var address = $scope.aglUser.Education[index].address.split(", ");
			$scope.aglSelectedEduCountry = address[1];
			
			var ind = $scope.aglWorldData.Countries.indexOf( $scope.aglSelectedEduCountry );
			$scope.aglSelectedEduStates = $scope.aglWorldData.States[ind].split("|");
			$scope.aglSelectedEduState = address[0];	
		}
		
		$scope.UpdateEducation = function(){
			
			$scope.CheckEduData();
			if ($scope.aglEducationError != "")
				return;

			var per = $scope.aglEduStartMonth + " " + $scope.aglEduStartYear + " - ";
			per = per + $scope.aglEduEndMonth + " " + $scope.aglEduEndYear;
			
			var ind = $scope.SelectedEduIndex;
			
			$scope.aglUser.Education[ind].major = $scope.aglMajor;
			$scope.aglUser.Education[ind].period = per;
			$scope.aglUser.Education[ind].logo = $scope.aglEduLogo;
			$scope.aglUser.Education[ind].address = $scope.aglSelectedEduState + ", " + $scope.aglSelectedEduCountry;
			
			$scope.flag6 = ! $scope.flag6;
			$scope.aglEduNameChecked = false;
			
			$scope.ResetEducationData();
			$scope.aglEducationError = "";
			
			$scope.SaveData();
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
			
			$scope.aglUser.Education.push (newEdu);
			
			$scope.ResetEducationData();
			$scope.aglEducationError = "";
			
			$scope.SaveData();
		}
		
		$scope.CheckEduData = function()
		{
			$scope.aglEducationError = "";
			if ($scope.aglSchoolName == null || $scope.aglSchoolName == "")
			{
				$scope.aglEducationError = "Error: Empty Name!";
				return;
			}

			if ($scope.aglMajor == null || $scope.aglMajor == "")
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
			
			var n = $scope.aglPublicData.MonthList.length;
			var ind1 = -1;
			var ind2 = -1;
			
			for (var i = 0; i < n; i++)
			{
				if ($scope.aglEduStartMonth == $scope.aglPublicData.MonthList[i].name)
					ind1 = i;
				if ($scope.aglEduEndMonth == $scope.aglPublicData.MonthList[i].name)
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
			var ind = $scope.aglWorldData.Countries.indexOf( $scope.aglSelectedEduCountry );
			$scope.aglSelectedEduStates = $scope.aglWorldData.States[ind].split("|");
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
			$scope.aglUser.Experience .splice(index, 1); 
			$scope.SelectedExpIndex = -1;
			$scope.flag5 = ! $scope.flag5;
			
			$scope.aglExpNameChecked = false;
			$scope.ResetExperienceData();
			$scope.aglExperienceError = "";
			
			$scope.SaveData();
		}
		
		$scope.EditExperience  = function(index){

			$scope.aglExpNameChecked = true;
			$scope.showDetails2 = true;
			$scope.flag5 = true;
			$scope.SelectedExpIndex = index;		
			
			$scope.aglCompanyName = $scope.aglUser.Experience[index].company;
			$scope.aglTitle = $scope.aglUser.Experience[index].title;
			$scope.aglExperienceDecription = $scope.aglUser.Experience[index].summary;
			
			var time = $scope.aglUser.Experience[index].period.split(" - ");
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
			
			$scope.aglUser.Experience[ind].title = $scope.aglTitle;
			$scope.aglUser.Experience[ind].period = per;
			$scope.aglUser.Experience[ind].summary = $scope.aglExperienceDecription;
			
			$scope.flag5 = ! $scope.flag5;
			$scope.aglExpNameChecked = false;
			
			$scope.ResetExperienceData();
			$scope.aglExperienceError = "";
			
			$scope.SaveData();
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
			
			$scope.aglUser.Experience.push (newExp);
			
			$scope.ResetExperienceData();
			$scope.aglExperienceError = "";
			
			$scope.SaveData();
		}
		
		$scope.CheckExpData = function()
		{
			$scope.aglExperienceError = "";
			if ($scope.aglCompanyName == null || $scope.aglCompanyName == "")
			{
				$scope.aglExperienceError = "Error: Empty Name!";
				return;
			}

			if ($scope.aglTitle == null || $scope.aglTitle == "")
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
			
			var n = $scope.aglPublicData.MonthList.length;
			var ind1 = -1;
			var ind2 = -1;
			
			for (var i = 0; i < n; i++)
			{
				if ($scope.aglExpStartMonth == $scope.aglPublicData.MonthList[i].name)
					ind1 = i;
				if ($scope.aglExpEndMonth == $scope.aglPublicData.MonthList[i].name)
					ind2 = i;
			}
			
			if ($scope.aglExpStartYear == $scope.aglExpEndYear && ind1 > ind2)
			{
				$scope.aglExperienceError = "Error: Invalid Period!";
				return;
			}
			
			if ($scope.aglExperienceDecription == null || $scope.aglExperienceDecription == "")
			{
				$scope.aglExperienceError = "Error: Empty Decription!";
				return;
			}
		}
		
		
		$scope.SaveData = function(){
			
			$scope.aglUser.$save();
		}
	}
]);