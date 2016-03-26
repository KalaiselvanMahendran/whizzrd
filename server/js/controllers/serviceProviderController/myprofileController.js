var myApp = angular.module('Whizzrd', []);

myApp.controller('myprofileController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    var refresh = function() {
        $scope.x = window.x;
        $http.get('/secure/employeelist/' + x).success(function(response) {
            $scope.employeeData = response;
        });
    };

    refresh();

    $scope.EditProfile = function(id){
    	console.log(id);
    	$http.get('/secure/employeelist/' + id).success(function(response) {
            $scope.employee = response;
        });
    };

    $scope.UpdateProfile = function(){
    	$http.put('/secure/employeelist/' + $scope.employee._id, $scope.employee).success(function(response){
    		console.log(response);
    		$window.location.reload();
    	});
    };



}]);
