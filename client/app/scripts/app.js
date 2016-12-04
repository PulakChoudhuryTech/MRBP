'use strict';

/**
 * @ngdoc overview
 * @name mrbpApp
 * @description
 * # mrbpApp
 *
 * Main module of the application.
 */
angular
  .module('mrbpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngTouch',
    'ui.router',
    'restangular',
    'login',
    'home'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('root', {
            abstract: true,
            template: '<div ui-view></div>',
            resolve : {
                userProfile: ['$q', '$location', '$localStorage', 'MrbpModelService', function ($q, $location, $localStorage, MrbpModelService) {
                    var deferred = $q.defer(),
                        uid = $localStorage.uid;

                    if (!uid) {
                        $location.path('/login');
                        deferred.resolve();
                        return deferred.promise;
                    }

                    return MrbpModelService.getUserById(uid).then(function(response) {
                        console.log(response);
                        $location.path('/home');
                        deferred.resolve();
                        return deferred.promise;
                    }, function(error) {
                        console.log(error);
                        $location.path('/login');
                        deferred.resolve();
                        return deferred.promise;
                    });
                }]
            }
        });

    $urlRouterProvider.otherwise('/login');
});
