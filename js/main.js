$(document).ready(function(){

});


//set up app
var app = angular.module('angularExample',['ngRoute']);

//set up root scope
app.run(function($rootScope,$http){
	$rootScope.appname="Sample Angular Application";
});


app.factory('contentFactory',function($http){
	var isLoaded = 0 ;
	var data = null;
	function loadContent(){
		if(!isLoaded){
			return $http.get('data/content.json').success(function(response){
				console.log("Content loaded successfully");
				data = response.content;
				isLoaded =1;
			});
		}
		else{
			console.log("Content previously loaded");
			return true;
		}
	}

	return{
		loadContent:function(){
			return loadContent();
		},
		getMain:function(){
			return data.main;
		},
		getAbout:function(){
			return data.about;
		}
	}
});


//routing
app.config(function($routeProvider,$locationProvider){
	$routeProvider
	  .when("/about", {
	    templateUrl : "/views/about.html",
	    controller	: "aboutCtrl",
	    resolve		: {
	    	contentloaded: function(contentFactory){
	    		return contentFactory.loadContent();
	    	}
	    }
	  })
	  .otherwise({
	  	templateUrl	: "/views/main.html",
	  	controller  : "mainCtrl", 
	  	resolve		: {
	    	contentloaded: function(contentFactory){
	    		console.log("resolved");
	    		return contentFactory.loadContent();
	    	}
	    }
	  });

	  $locationProvider.html5Mode(true);
});


//controllers
app.controller('mainCtrl',function($scope,contentFactory){
	$scope.pageContent = contentFactory.getMain();
});

app.controller('aboutCtrl',function($scope,contentFactory){
	$scope.pageContent = contentFactory.getAbout();
});
