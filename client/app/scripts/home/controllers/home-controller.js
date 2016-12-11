'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
    .controller('HomeController', ['$scope', 'MrbpModelService', '$cookieStore', function ($scope, MrbpModelService, $cookieStore) {

        var vm = this;
        var init = function init() {
            // $("#accordion").accordion({
            //     heightStyle: "fill",
            //     collapsible: true,
            //     active: false
            // });
            MrbpModelService.getMeetingBookingsList().then(function (response) {
                    vm.meetingsList = response.data.plain();
                    console.log(vm.meetingsList);
            }, function (error) {

            });
        };

        init();
}]);
