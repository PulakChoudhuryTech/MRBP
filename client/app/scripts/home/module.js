'use strict';

angular.module('home', [])

.config(function($stateProvider) {

    $stateProvider
        .state('root.home', {
            url: '/home',
            controller: 'HomeController',
            controllerAs: 'HomeCtrl',
            templateUrl: 'views/home/home.html',
            resolve: {
	            appData: function(MrbpAppOptionsService, MrbpModelService, MrbpHelperService) {
	            	return MrbpAppOptionsService.loadOptions().then(function(response) {
	            		return MrbpModelService.getOfsEmployeesList().then(function(response) {
	            			MrbpHelperService.setEmployeeList(response.data.plain());
	            		});
	            	});
	            }
            } 
        });
});
