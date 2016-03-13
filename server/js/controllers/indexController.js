var myApp = angular.module('Whizzrd', []);

myApp.controller('indexController', ['$scope', function($scope){
	$scope.message = "welcome to Whizzrd";
}]);