var myApp = angular.module('Whizzrd', ['ui.date',]);

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

myApp.controller('newBookingController', ['$scope', '$http', function($scope, $http){

		$scope.newObject = {};

		var refresh = function(){
			$scope.x = window.x;
			$scope.area_name = window.area;
		   $http.get('/secure/authenticate/mainserviceslist').success(function(response){
				$scope.serviceslist = response;
				$scope.services = "";
			});

		};

		refresh();

		$scope.getEmployee = function(service){
			var area = $scope.area_name;
			var status = "Available";
			$http.get('/secure/authenticate/employeelist/employee/' + area + '/' + service + '/' + status).success(function(response){
				$scope.employee = response;
				if($scope.employee.length > 0) {
					$scope.employeeSelected = response[0].name;	
					console.log($scope.employeeSelected);
				}
				else
				{
					$scope.employeeSelected = 'Default';	
					console.log($scope.employeeSelected);
				}
				
			});
		};

		$scope.getSpecifications = function(service){
			var area = $scope.area_name;
			$http.get('/secure/authenticate/mainserviceslist/specifications/' + area + '/' + service).success(function(response){
				$scope.specificationlist = response[0].specifications; 
				console.log(response[0].specifications);
			});
		};

		$scope.newBooking = function() {
			$scope.order.employee = $scope.employeeSelected;
			var specifications = [];
			angular.forEach($scope.newObject, function(value, key) {
			  this.push(key);
			}, specifications);
			$scope.order.specifications = specifications;
			console.log($scope.order);
		};


}]);