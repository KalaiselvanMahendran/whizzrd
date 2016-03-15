var myApp = angular.module('Whizzrd', []);

myApp.controller('serviceController', ['$scope', '$http', function($scope, $http){
	$scope.msg = "Service Page";

	// Retrieving all service list
	var refresh = function(){
		$http.get('/secure/authenticate/servicelist').success(function(response){
			$scope.servicelist = response;
			$scope.service = "";
			$scope.services = "";
		});

		$http.get('/secure/authenticate/specificationlist').success(function(response){
			$scope.specificationlist = response;
			$scope.specification = "";
		});
		
		$http.get('/secure/authenticate/arealist').success(function(response){
			$scope.arealist = response;
		});
	};

	refresh();

	// Adding new service
	$scope.AddService = function(){
		$http.post('/secure/servicelist', $scope.service).success(function(response){
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
	$scope.DeleteService = function(id){
		var r = confirm('Are you want to Delete');
		if(r === true)
		{
			$http.delete('/secure/servicelist/' + id).success(function(){
				refresh();
			});	
		}
	};

	// Adding new specification
	$scope.AddSpecification = function(){
		console.log($scope.specification);
		$http.post('/secure/specificationlist', $scope.specification).success(function(response){
			console.log(response);
			refresh();
		});
	};

	// Deleting existing specification
	$scope.DeleteSpecification = function(id){
		var r = confirm('Are you want to Delete');
		if(r === true)
		{
			$http.delete('/secure/specificationlist/' + id).success(function(){
				refresh();
			});	
		}
	};

	// Editing existing Area
	$scope.EditSpecification = function(id){
		$http.get('/secure/specificationlist/' + id).success(function(response){
			$scope.specification = response;
		});
	};

	// Update existing serivice
	$scope.UpdateSpecification = function(){
		$http.put('/secure/specificationlist/' + $scope.specification._id, $scope.specification).success(function(response){
			refresh();
		});
	};

}]);