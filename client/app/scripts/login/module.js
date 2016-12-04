'use strict';

angular.module('login', [])

.config(function($stateProvider) {

    $stateProvider
        .state('root.login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/login/login.html'
        });
});
