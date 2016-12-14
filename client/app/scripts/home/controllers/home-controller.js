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
            MrbpModelService.getMeetingBookingsList().then(function (response) {
                vm.meetingsList = response.data.plain();
                console.log(vm.meetingsList);
            }, function (error) {

            });

            vm.filterMenus = [{
                                    className : 'metric-circle noFilters',
                                    role: 'noFilter_circle',
                                    label: 'All Filters'
                                },
                                {
                                    className : 'metric-circle completed',
                                    role: 'completed_circle',
                                    label: 'Completed'
                                },
                                {
                                    className : 'metric-circle cancelled',
                                    role: 'cancelled_circle',
                                    label: 'Cancelled'
                                },
                                {
                                    className : 'metric-circle inprogress',
                                    role: 'inprogress_circle',
                                    label: 'In progress'
                                },
                                {
                                    className : 'metric-circle notStarted',
                                    role: 'notStarted_circle',
                                    label: 'Not started'
                                }];
        };

        init();
}]);
