var myApp = angular.module('Whizzrd', ['ngRoute']).
			config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
				
				$routeProvider.
					when('/secure/home', {
						templateUrl: '/views/static/home.html', 
						controller: 'homeController'
					});

				// $routeProvider.otherwise({redirectTo: '/index'});
				$locationProvider.html5Mode({enabled: true, requireBase: false});
			}]);