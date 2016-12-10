'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
  .controller('LoginController', ['$state', 'MrbpUtilitis', '$localStorage', 'MrbpModelService', function ($state, MrbpUtilitis, $localStorage, MrbpModelService) {

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
        vm.loginModel.password = MrbpUtilitis.getEncryptedValue(vm.loginModel.password,  vm.loginModel.userName);
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

    vm.onRegisterUser = function onRegisterUser() {
        if (vm.registrationModel.password !== vm.registrationModel.confirmPassword) {
            return;
        }
        vm.registrationModel.notification = "false";
        vm.registrationModel.password = MrbpUtilitis.getEncryptedValue(vm.registrationModel.password,  vm.registrationModel.userName);
        vm.registrationModel.confirmPassword = vm.registrationModel.password;
        MrbpModelService.registerUser(vm.registrationModel).then(function(response) {
            vm.registrationModel = {};
        }, function(error) {});
    };

    init();
}]);
