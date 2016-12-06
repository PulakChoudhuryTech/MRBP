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

    var init = function init() {
        $('.toggle').on('click', function() {
            $('.container').stop().addClass('active');
            // $(this).css({'height': '210px'});
        });

        $('.close').on('click', function() {
            $('.container').stop().removeClass('active');
            // $('.toggle').css({'height': '140px'});
        });
    };

    MrbpModelService.getUsers().then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });

    init();
}]);
