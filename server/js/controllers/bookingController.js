var myApp = angular.module('Whizzrd', ['ui.date']);

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

myApp.controller('bookingController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location){

		$scope.msg = "Whizzrd.com";

		$scope.newObject = {};

		// Retrieving all service list
		var refresh = function(){
		   $http.get('/secure/authenticate/mainserviceslist').success(function(response){
				$scope.serviceslist = response;
			});
			$http.get('/secure/authenticate/bookinglist').success(function(response){
				$scope.bookinglist = response;
			});
		};

		refresh();

		$scope.getAreaname = function(id){
			$http.get('/secure/authenticate/mainserviceslist/area/' + id).success(function(response){
				$scope.areas = response;
			});
		};

		$scope.getServicename = function(id){
			$http.get('/secure/authenticate/mainserviceslist/service/' + id).success(function(response){
				$scope.services = response;
			});
		};

		$scope.getSpecifications = function(area, service){
			$http.get('/secure/authenticate/mainserviceslist/specifications/' + area + '/' + service).success(function(response){
				$scope.specifications = response;
			});
		};

		$scope.getEmployee = function(area, service){
			$http.get('/secure/authenticate/employeelist/employee/' + area + '/' + service).success(function(response){
				$scope.employee = response;
				$scope.employeeSelected = response[0].name;
			});
		};

		$scope.AddBooking = function(){
			$scope.booking.order.area_name = $scope.booking.area_name;
			$scope.booking.order.employee = $scope.employeeSelected;
			var specifications = [];
			angular.forEach($scope.newObject, function(value, key) {
			  this.push(key);
			}, specifications);
			$scope.booking.order.specifications = specifications;
			console.log($scope.booking);
			$http.post('/booking', $scope.booking).success(function(response){
				console.log(response);
				refresh();
				$window.location.reload();
			});
		};

		
		

}]);