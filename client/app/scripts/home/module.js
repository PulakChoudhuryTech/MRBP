'use strict';

angular.module('home', [])

.config(function($stateProvider) {

    $stateProvider
        .state('root.home', {
            url: '/home',
            controller: 'homeController',
            templateUrl: 'views/home/home.html'
        });
});
