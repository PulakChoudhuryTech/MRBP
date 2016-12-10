'use strict';

angular.module('home', [])

.config(function($stateProvider) {

    $stateProvider
        .state('root.home', {
            url: '/home',
            controller: 'homeController',
            controllerAs: 'homeCtrl',
            templateUrl: 'views/home/home.html'
        });
});
