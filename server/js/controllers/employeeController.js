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

myApp.controller('EmployeeController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){

	$scope.showModal = false;
	$scope.toggleModal = function(){
	   $scope.showModal = !$scope.showModal;
	};

	$scope.newObject = {};

	 $scope.mindate = new Date();

	$scope.days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

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
	
	$scope.AddEmployee = function(name,service_name,email,mobile,address,area_name,city_name,availabilty,username,password){
		$scope.employee = {
			name: name,
			service_name: service_name,
			email: email,
			mobile: mobile,
			address: address,
			area_name: area_name,
			city_name: city_name,
			availabilty: availabilty,
			username: username,
			password: password
		};
		console.log($scope.employee);
		$http.post('/secure/employeelist', $scope.employee).success(function(response){
			// refresh();
			$window.location.reload();
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