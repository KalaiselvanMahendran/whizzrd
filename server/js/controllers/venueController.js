var myApp = angular.module('Whizzrd', []);

myApp.controller('venueController', ['$scope', '$http', function($scope, $http){
	$scope.msg = "Venue Page";

	// Retrieving all city list
	var refresh = function(){
		$http.get('/secure/authenticate/citylist').success(function(response){
			$scope.citylist = response;
			$scope.city = "";
		});

		$http.get('/secure/authenticate/arealist').success(function(response){
			$scope.arealist = response;
			$scope.location = "";
		});
	};

	refresh();

	// Adding new city
	$scope.AddCity = function(){
		console.log($scope.city);
		$http.post('/secure/citylist', $scope.city).success(function(response){
			refresh();
		});
	};

	// Deleting existing city
	$scope.DeleteCity = function(id){
		console.log(id);
		var r = confirm('Are you want to Delete');
		if(r === true)
		{
			$http.delete('/secure/citylist/' + id).success(function(){
				refresh();
			});	
		}
	};

	// Editing existing city
	$scope.EditCity = function(id){
		$http.get('/secure/citylist/' + id).success(function(response){
			$scope.city = response;
		});
	};

	// Update existing city
	$scope.UpdateCity = function(){
		$http.put('/secure/citylist/' + $scope.city._id, $scope.city).success(function(response){
			refresh();
		});
	};

	// Add Location
	$scope.AddLocation = function(){
		$http.post('/secure/arealist', $scope.location).success(function(response){
			refresh();
		});
	};

	// Editing existing Area
	$scope.EditLocation = function(id){
		$http.get('/secure/arealist/' + id).success(function(response){
			$scope.location = response;
		});
	};

	// Update existing Area
	$scope.UpdateLocation = function(){
		$http.put('/secure/arealist/' + $scope.location._id, $scope.location).success(function(response){
			refresh();
		});
	};

	// Deleting existing Area
	$scope.DeleteLocation = function(id){
		var r = confirm('Are you want to Delete');
		if(r === true)
		{
			$http.delete('/secure/arealist/' + id).success(function(){
				refresh();
			});	
		}
	};




}]);