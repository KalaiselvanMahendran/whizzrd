/**
*  Module
*
* Description
*/ 
var myApp = angular.module('Whizzrd', []);

myApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

myApp.controller('EmployeeController', ['$scope', '$http', function($scope, $http){

	// Retrieving all service list
	var refresh = function(){
		$http.get('/secure/authenticate/mainserviceslist').success(function(response){
			$scope.serviceslist = response;
		});
		$http.get('/secure/authenticate/employeelist').success(function(response){
			$scope.employeelist = response;
			$scope.employee = "";
		});
	};

	refresh();

	$scope.getAreaname = function(id){
		$http.get('/secure/authenticate/serviceslist/service/' + id).success(function(response){
			$scope.areas = response;
		});
	};

	$scope.getCityname = function(id){
		$http.get('/secure/authenticate/serviceslist/area/' + id).success(function(response){
			$scope.citylist = response;
		});
	};
	
	$scope.AddEmployee = function(){
		$http.post('/secure/employeelist', $scope.employee).success(function(response){
			refresh();
		});
	};

	$scope.DeleteEmployee = function(id){
		var r = confirm('Are you want to Delete');
		if(r === true)
		{
			$http.delete('/secure/employeelist/' + id).success(function(){
				refresh();
			});	
		}
	};

	$scope.EditEmployee = function(id){
		$http.get('/secure/employeelist/' + id).success(function(response){
			$scope.employee = response;
		});
	};

	$scope.UpdateEmployee = function(){
		$http.put('/secure/employeelist/' + $scope.employee._id, $scope.employee).success(function(response){
			refresh();
		});
	};


}]);