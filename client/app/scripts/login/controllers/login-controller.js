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
        vm.isValidUser = true;
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
        vm.loginModel.password = CryptoJS.AES.encrypt(vm.loginModel.password, vm.loginModel.userName).toString();
        MrbpModelService.getUserProfile(vm.loginModel).then(function(response) {
            if (response && !response.data) {
                vm.loginModel.password = '';
                vm.isValidUser = false;
                return;
            }
            $localStorage.uid = CryptoJS.AES.encrypt(response.data.id, 'uid').toString();
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
