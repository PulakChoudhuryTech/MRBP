'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
  .controller('LoginController', ['$state', '$localStorage', 'MrbpModelService', function ($state, $localStorage, MrbpModelService) {

    var vm = this;

    var init = function init() {
        vm.isRegisterForm = false;
        vm.loginModel = {};
    };

    vm.onToggleClick = function onToggleClick() {
        vm.isRegisterForm = true;
        $('.container').stop().addClass('active');
    };

    vm.onCloseClick = function onCloseClick() {
        vm.isRegisterForm = false;
        $('.container').stop().removeClass('active');
    };

    vm.doLogin = function doLogin() {
        MrbpModelService.getUserProfile(vm.loginModel).then(function(response) {
            if (response && response.data === 'Invalid User') {
                return;
            }
            $localStorage.uid = response.data.id;
            $state.go('root.home');
        }, function(error) {
            console.log(error);
        });
    };

    /*MrbpModelService.getUsers().then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });*/

    init();
}]);
