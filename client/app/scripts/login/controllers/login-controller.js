'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
  .controller('LoginController', ['MrbpModelService', function (MrbpModelService) {

    MrbpModelService.getUsers().then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });
}]);
