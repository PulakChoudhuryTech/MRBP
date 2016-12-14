'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
    .controller('HomeController', ['$scope', '$state', '$localStorage', 'MrbpModelService', 'MrbpHelperService', function ($scope, $state, $localStorage, MrbpModelService, MrbpHelperService) {

        var vm = this;
        var init = function init() {

            if (!$localStorage.uid) {
                $state.go('root.login');
                return;
            }

            MrbpModelService.getOfsEmployeesList().then(function (response) {
                vm.userDetails = MrbpHelperService.getUserDetails();
                constuctUserData(response.data);
            }, function(error) {
                vm.userDetails = MrbpHelperService.getUserDetails();
            });

            MrbpModelService.getMeetingBookingsList().then(function (response) {
                vm.meetingsList = response.data.plain();
                console.log(vm.meetingsList);
            }, function(error) {

            });

            vm.filterMenus = [
                {
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
                }
            ];
        };

        var constuctUserData = function constuctUserData(users) {
            var userData = _.where(users, {prof_id: String(vm.userDetails.empId)})[0];
            vm.userDetails.name = userData.name;
            vm.userDetails.datauri = userData.datauri;
        };

        vm.doLogout = function doLogout() {
            $localStorage.uid = '';
            $state.go('root.login');
        };

        init();
}]);
