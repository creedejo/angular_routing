$(document).ready(function(){

});


//set up app
var app = angular.module('angularExample',['ngRoute']);

//set up root scope
app.run(['$rootScope','$http',function($rootScope,$http){
	$rootScope.appname="Sample Angular Application";

	$http.get('data/content.json').success(function(response){
		console.log("Content file loaded.");
		$rootScope.content = response.content;
	});
}]);


//routing
app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	  .when("/about", {
	    templateUrl : "views/about.html",
	    controller	: "aboutCtrl" 
	  })
	  .otherwise({
	  	templateUrl	: "views/main.html",
	  	controller  : "mainCtrl", 
	  });

	  $locationProvider.html5Mode(true);
}]);


//controllers
app.controller('mainCtrl',['$scope','$rootScope',function($scope,$rootScope){
	console.log("DEFAULT CONTENT PAGE");
	$scope.pageContent = $rootScope.content.main;
}]);

app.controller('aboutCtrl',['$scope','$rootScope',function($scope,$rootScope){
	console.log("ABOUT PAGE");
	$scope.pageContent = $rootScope.content.about;
}]);
