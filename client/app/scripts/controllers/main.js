'use strict';

/**
 * @ngdoc function
 * @name mrbpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrbpApp
 */
angular.module('mrbpApp')
  .controller('MainCtrl', ['MrbpModelService', function (MrbpModelService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    MrbpModelService.getUsers().then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });
}]);
