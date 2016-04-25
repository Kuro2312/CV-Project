angular.module('myApp', []).controller('myCtrl', function($scope){
	$scope.aglFullName = "Nguyễn Minh Dũng";
	$scope.aglJob = "Junior at University Of Science";
	$scope.aglPhone = "0967 872 636";
	$scope.aglEmail = "minhdungnguyen1995@gmail.com";
	$scope.aglAddress = "Ho Chi Minh, VietNam";
	$scope.aglMoreDetailAboutAddress = "Xo Viet Nghe Tinh Street, Ward  21, District Binh Thanh, Ho Chi Minh City";
	
	$scope.aglHeaders = [];
	$scope.aglHeaders.push("Summary");
	$scope.aglHeaders.push("Education");
	$scope.aglHeaders.push("Experience");
	$scope.aglHeaders.push("Projects");
	$scope.aglHeaders.push("Languages");
	$scope.aglHeaders.push("Skills");	
	$scope.aglHeaders.push("Interests");
	
	$scope.aglSummary = "I'm have been studying about programming for 4 years";
	
	
	
	$scope.aglUniversity1 = "University Of Science";
	$scope.aglPeriod1 = "Sep 2013 - Apr 2016";
	$scope.aglMajor1 = "Information Techology - Software Engineering";

	$scope.aglInterests = [];
	$scope.aglInterests.push("Sport: Football, Basketball, Jogging, Cycling");
	$scope.aglInterests.push("Free time: reading book and comic, watching cartoon and listening to English music");
	$scope.aglInterests.push("Language: Chinese, Japanese");

	$scope.aglExperience = [];
	$scope.aglExperience.push("2 years of advanced experience with C#, C++");
	$scope.aglExperience.push("Past game projects: Brick, Snake, Mine Sweeper, 2048, Tank, Caro…. programmed by C#, C++");
	$scope.aglExperience.push("Many projects related to SQL, Layers Architecture, …");
	
	$scope.aglSkill = [];
	$scope.aglSkill.push({name:"Language", details : []});
	$scope.aglSkill.push({name:"Programming", details : []});
	$scope.aglSkill.push({name:"Others", details : []});
	
	$scope.aglSkill[0].details.push("Good English reading skills");					
	$scope.aglSkill[0].details.push("Fair English and Japanese communication skills");				
	$scope.aglSkill[0].details.push("Writing and reading Japanese skills is intermediate");
	
	$scope.aglSkill[1].details.push("Good knowledge in design patterns and software architectures such as MVC, Layers, Microkernel... ");					
	$scope.aglSkill[1].details.push("Good at programming Windows Form and WPF Application");				
	$scope.aglSkill[1].details.push("Intermediate knowledge in database, SQL, ADO.NET");
	$scope.aglSkill[1].details.push("Good at analyzing and designing database");
	$scope.aglSkill[1].details.push("Advanced knowledge about C++, C#, MS SQL, ADO.NET");
	$scope.aglSkill[1].details.push("Basic knowledge in Java, Android, HTML, CSS, JavaScript, Angular, Socket, Multithread");
	
	$scope.aglSkill[2].details.push("Teamwork skill, Planning skill, Information searching skill");					
	$scope.aglSkill[2].details.push("Focus on working very well");				
	$scope.aglSkill[2].details.push("Knowledge about GitHub, Excel, Word, Latex");
});