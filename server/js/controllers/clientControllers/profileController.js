var myApp = angular.module('Whizzrd', []);

myApp.controller('profileController', ['$scope', '$http', function($scope, $http){
		
	var refresh = function(){
			$scope.x = window.x;
			$http.get('/authenticate/bookinglist/profileData/' + $scope.x).success(function(response){
				$scope.profileData = response;
				$scope.profile = "";
			});	
		};
		
	refresh();

	$scope.EditProfile = function(id){
		$http.get('/authenticate/bookinglist/profileData/' + $scope.x).success(function(response){
				$scope.profile = response;
			});
	};

	$scope.UpdateProfile = function(id){
		$http.put('/authenticate/bookinglist/profileData/' + $scope.profile._id, $scope.profile).success(function(response){
			refresh();
			console.log(response);
		});
	};

}]);