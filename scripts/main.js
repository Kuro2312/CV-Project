angular.module('myApp', []).controller('myCtrl', function($scope){
	$scope.aglFullName = "Nguyễn Minh Dũng";
	$scope.aglJob = "Junior at University Of Science";
	$scope.aglPhone = "0967 872 636";
	$scope.aglEmail = "minhdungnguyen1995@gmail.com";
	$scope.aglAddress = "Ho Chi Minh, VietNam";
	$scope.aglNation = "Vietnamese";
	$scope.aglMoreDetailAboutAddress = "Xo Viet Nghe Tinh Street, Ward  21, District Binh Thanh, Ho Chi Minh City";
	
	$scope.aglHeaders = [];
	$scope.aglHeaders.push("Summary");
	$scope.aglHeaders.push("Education");
	$scope.aglHeaders.push("Experience");
	$scope.aglHeaders.push("Projects");
	$scope.aglHeaders.push("Languages");
	$scope.aglHeaders.push("Skills");	
	$scope.aglHeaders.push("Interests");
	
	$scope.aglSummary = "I'm have been studying about programming for 4 years. Two years of advanced experience with C#, C++. I very interested in software architectures and software solutions";
	
	$scope.aglEducation = [];
	$scope.aglEducation.push({university : "University Of Science", address : "Ho Chi Minh, VietNam",
	period : "Sep 2013 - Apr 2016", major : "Information Technology - Software Engineering", logo : "images/UOS_Icon.png"});
	
	$scope.aglSkills = [];
	$scope.aglSkills.push("HTML");
	$scope.aglSkills.push("CSS");
	$scope.aglSkills.push("JavaScript");
	$scope.aglSkills.push("Angular");
	$scope.aglSkills.push("MS SQL");
	$scope.aglSkills.push("Window Form C#");
	$scope.aglSkills.push("WPF C#");
	$scope.aglSkills.push("C");
	$scope.aglSkills.push("C++");
	$scope.aglSkills.push(".Net");
	$scope.aglSkills.push("Java");
	$scope.aglSkills.push("XML");
	$scope.aglSkills.push("Software Architecture");
	$scope.aglSkills.push("Design Patterns");
	$scope.aglSkills.push("Android Development");
	$scope.aglSkills.push("Software Development");
	$scope.aglSkills.push("GitHub");
	$scope.aglSkills.push("ADO.NET");
	
	$scope.aglInterests = [];
	$scope.aglInterests.push("Playing Football");
	$scope.aglInterests.push("Basketball");
	$scope.aglInterests.push("Jogging");
	$scope.aglInterests.push("Cycling");
	$scope.aglInterests.push("Reading Comic");
	$scope.aglInterests.push("Reading Book");
	$scope.aglInterests.push("Watching cartoon")
	$scope.aglInterests.push("Listening to English and Japanese music");
	$scope.aglInterests.push("Chinese");
	$scope.aglInterests.push("Japanese");

	$scope.aglLanguages = [];
	$scope.aglLanguages.push({name : "English", summary : "Quite Good"});
	$scope.aglLanguages.push({name : "Japanese", summary : "Quite Good"});
	$scope.aglLanguages.push({name : "Vietnamese", summary : "Speak fluently"});
	
	$scope.aglProjects = [];
	$scope.aglProjects.push({name : "Game Tetris, Snake", language : "C++", period : "5/2014 - 6/2014", summary : "For praticing C++"});
	$scope.aglProjects.push({name : "Game 2048, Mine Sweeper, Caro", language : "C#", period : "5/2015 - 6/2015", summary : "For praticing C# about Key Input, Thread, Delegate, MVC"});
	$scope.aglProjects.push({name : "Game Battle City", language : "C#", period : "9/2015 - 12/2015", summary : "Project in Unversity like the classical game Battle City. For praticing Thread, WPF..."});
	$scope.aglProjects.push({name : "Paint DS", language : "C#", period : "9/2015 - 12/2015", summary : "Software use to draw many shapes like star, rectangle.. and insert picture, text. For praticing Mouse Event, Thread, WPF..."});
});

