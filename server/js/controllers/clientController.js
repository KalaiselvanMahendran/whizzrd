var myApp = angular.module('Whizzrd', ['ui.bootstrap']);

myApp.controller('clientController', ['$scope', '$http', function($scope, $http){
		
	var refresh = function(){
		$http.get('/secure/authenticate/bookinglist').success(function(response){
			$scope.bookings = response;
		});
	};

	refresh();

	$scope.getOrders = function(id){
		$http.get('/secure/orderslist/' + id).success(function(response){
			$scope.orders = response.order;
			console.log($scope.orders);
		});
	};

	 $scope.tableRowExpanded = false;
    $scope.tableRowIndexCurrExpanded = "";
    $scope.tableRowIndexPrevExpanded = "";
    $scope.storeIdExpanded = "";
    $scope.dayDataCollapse = [true, true, true, true, true, true];


    $scope.transactionShow = 0;

    $scope.dayDataCollapseFn = function () {
        for (var i = 0; $scope.storeDataModel.storedata.length - 1; i += 1) {
            $scope.dayDataCollapse.append('true');
        }
    };

    $scope.selectTableRow = function (index, storeId) {
        if ($scope.dayDataCollapse === 'undefined') {
            $scope.dayDataCollapse = $scope.dayDataCollapseFn();
        } else {

            if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "" && $scope.storeIdExpanded === "") {
                $scope.tableRowIndexPrevExpanded = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexCurrExpanded = index;
                $scope.storeIdExpanded = storeId;
                $scope.dayDataCollapse[index] = false;
            } else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexCurrExpanded === index && $scope.storeIdExpanded === storeId) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    $scope.storeIdExpanded = "";
                    $scope.dayDataCollapse[index] = true;
                } else {
                    $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                    $scope.tableRowIndexCurrExpanded = index;
                    $scope.storeIdExpanded = storeId;
                    $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                    $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                }
            }
        }
    };


}]);