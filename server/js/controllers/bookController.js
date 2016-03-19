var myApp = angular.module('Whizzrd', ['ui.date', 'checklist-model']);

myApp.controller('bookController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){

		$scope.exportData = function () {
        	var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        	});
        	saveAs(blob, "Report.xls");
    	};

		$scope.showModal = false;
	   $scope.toggleModal = function(){
	      $scope.showModal = !$scope.showModal;
	   };

		var refresh = function(){
			$http.get('/secure/authenticate/bookinglist').success(function(response){
				$scope.bookinglist = response;
			});

			$http.get('/secure/authenticate/servicelist').success(function(response){
				$scope.servicelist = response;
			});

			$http.get('/secure/authenticate/specificationlist/').success(function(response){
				$scope.specificationlist = response;
			});
			
			$http.get('/secure/authenticate/arealist').success(function(response){
				$scope.arealist = response;
			});

			$http.get('/secure/authenticate/employeelist').success(function(response){
				$scope.employeelist = response;
			});
		};

		refresh();

		$scope.DeleteBooking  = function(id){
			var r = confirm('Are you want to Delete');
			if(r === true)
			{
				$http.delete('/secure/bookinglist/' + id).success(function(){
					refresh();
				});	
			}
		};

		$scope.EditBooking = function(id, area, service){
			$http.get('/secure/bookinglist/updatespecifications/' + area + '/' + service).success(function(response){
				$scope.specificationlist = response;
			});
			$http.get('/secure/bookinglist/' + id).success(function(response){
				$scope.order = response.order[0];
				$scope.area_name = response.order[0].area_name;
				$scope.specifications = response.order[0].specifications;
				var checked = [];
				angular.forEach($scope.specifications, function(value, key) {
				  this.push(value);
				}, checked);
				$scope.specification = {
				   checked 
				};
			});
		};

		$scope.getEmployee = function(area, service){
			$http.get('/secure/bookinglist/updatespecifications/' + area + '/' + service).success(function(response){
				$scope.specificationlist = response;
			});
			$http.get('/secure/bookinglist/employee/' + area + '/' + service).success(function(response){
				$scope.employeelist = response;
				$scope.specification = {};
			});
		};

		$scope.UpdateBooking = function(){
			var specifications = [];
			angular.forEach($scope.specification.checked, function(value, key) {
			  this.push(value);
			}, specifications);
			$scope.order.specifications = specifications;
			$http.put('/secure/bookinglist/' + $scope.order._id, $scope.order).success(function(response){
				refresh();
				$window.location.reload();
			});
		};

		

}]);

