'use strict';

angular.module('home', [])

.config(function($stateProvider) {

    $stateProvider
        .state('root.home', {
            url: '/home',
            controller: 'HomeController',
            controllerAs: 'HomeCtrl',
            templateUrl: 'views/home/home.html'
        });
});
