var myApp = angular.module('Whizzrd', ['checklist-model']);

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

myApp.controller('mainServiceController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){

	$scope.specification = {};

	// Retrieving all service list
	var refresh = function(){
	   $http.get('/secure/authenticate/mainserviceslist').success(function(response){
			$scope.serviceslist = response;
			$scope.services = "";
		});
		
		$http.get('/secure/authenticate/servicelist').success(function(response){
			$scope.servicelist = response;
			$scope.services = "";
		});

		$http.get('/secure/authenticate/specificationlist').success(function(response){
			$scope.specificationlist = response;
			$scope.services = "";
		});
		
		$http.get('/secure/authenticate/arealist').success(function(response){
			$scope.arealist = response;
			$scope.services = "";
		});
	};

	refresh();

	$scope.getAreaname = function(id){
		console.log(id);
		$http.get('/secure/authenticate/arealist/' + id).success(function(response){
			$scope.areanames = response;
		});
	};

	// Adding new service
	$scope.AddServices = function(){
		$scope.services.specifications = $scope.specification.checked;
		// console.log($scope.services);
		$http.post('/secure/mainserviceslist', $scope.services).success(function(response){
			$window.location.reload();
		});
	};

	// Editing existing Area
	$scope.EditServices = function(id){
		$http.get('/secure/serviceslist/' + id).success(function(response){
			$scope.services = response;
			$scope.specifications = response.specifications;
			console.log(response.specifications);
			var checked = [];
				angular.forEach($scope.specifications, function(value, key) {
				  this.push(value);
				}, checked);
				$scope.specification = {
				   checked 
			};
		});
	};

	// Update existing serivice
	$scope.UpdateServices = function(){
		var specifications = [];
		angular.forEach($scope.specification.checked, function(value, key) {
			this.push(value);
		}, specifications);
		$scope.services.specifications = specifications;
		console.log($scope.services);
		$http.put('/secure/serviceslist/' + $scope.services._id, $scope.services).success(function(response){
			$window.location.reload();
		});
	};

	// Deleting existing serivice
	$scope.DeleteServices = function(id){
		var r = confirm('Are you want to Delete');
		if(r === true)
		{
			$http.delete('/secure/mainserviceslist/' + id).success(function(){
				refresh();
			});	
		}
	};

}]);