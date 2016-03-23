var myApp = angular.module('Whizzrd', []);

myApp.controller('myBookingsController', ['$scope', '$http', function($scope, $http){

		var refresh = function(){
			$scope.x = window.x;
			console.log($scope.x);
			$http.get('/authenticate/bookinglist/' + $scope.x).success(function(response){
				$scope.orders = response.order;
			});	
		};
		
		refresh();
}]);