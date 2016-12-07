'use strict';

angular.module('login', [])

.config(function($stateProvider) {

    $stateProvider
        .state('root.login', {
            url: '/login',
            controller: 'LoginController',
            controllerAs: 'LoginCtrl',
            templateUrl: 'views/login/login.html'
        });
});
