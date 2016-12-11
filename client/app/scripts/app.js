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
    'ui.bootstrap',
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
                    // Decrypt uder id
                    var bytes  = CryptoJS.AES.decrypt(uid.toString(), 'uid');
                    uid = bytes.toString(CryptoJS.enc.Utf8);

                    return MrbpModelService.getUserById(uid).then(function(response) {
                        $location.path('/home');
                        deferred.resolve();
                        return deferred.promise;
                    }, function(error) {
                        $location.path('/login');
                        deferred.resolve();
                        return deferred.promise;
                    });
                }]
            }
        });

    $urlRouterProvider.otherwise('/home');
});
