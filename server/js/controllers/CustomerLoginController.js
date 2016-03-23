var myApp = angular.module('Whizzrd', []);

myApp.controller('CustomerLoginController', ['$scope', '$http', function($scope, $http){
		$scope.msg = "Whizzrd Login";

		$scope.getOtp = function(){
			$http.post('/loginOtp', $scope.loginForm).success(function(response){
				console.log(response);
			});
		};

}]);