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

myApp.controller('bookingController', ['$scope', '$http', function($scope, $http){

		$scope.msg = "Whizzrd.com";

		$scope.newObject = {};

		// Retrieving all service list
		var refresh = function(){
		   $http.get('/secure/authenticate/mainserviceslist').success(function(response){
				$scope.serviceslist = response;
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

		
		

}]);