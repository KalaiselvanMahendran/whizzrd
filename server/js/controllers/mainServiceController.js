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

myApp.controller('mainServiceController', ['$scope', '$http', function($scope, $http){

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
			console.log(response);
		});
	};

	// Adding new service
	$scope.AddServices = function(){
		$http.post('/secure/mainserviceslist', $scope.services).success(function(response){
			console.log(response);
			refresh();
		});
	};

	// Editing existing Area
	$scope.EditService = function(id){
		$http.get('/secure/servicelist/' + id).success(function(response){
			$scope.service = response;
		});
	};

	// Update existing serivice
	$scope.UpdateService = function(){
		$http.put('/secure/servicelist/' + $scope.service._id, $scope.service).success(function(response){
			refresh();
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