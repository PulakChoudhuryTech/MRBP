'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
    .controller('HomeController', ['$scope', '$state', '$localStorage', 'MrbpModelService', 'MrbpHelperService', 'MrbpAppOptionsService','$uibModal', function ($scope, $state, $localStorage, MrbpModelService, MrbpHelperService, MrbpAppOptionsService,$uibModal) {

        var vm = this;
        var init = function init() {

            vm.isMeetingLoading = false;
            if (!$localStorage.uid) {
                $state.go('root.login');
                return;
            }

            //gets user details from helper service
            vm.userDetails = MrbpHelperService.getUserDetails();
            constuctUserData(MrbpHelperService.getEmployeeList());

            MrbpModelService.getMeetingBookingsList().then(function (response) {
                vm.meetingsList = response.data.plain();
            }, function(error) {});

           MrbpModelService.getRooms().then(function (response) {
                vm.roomsList = response.data.plain();
            }, function(error) {});

            vm.filterMenus = MrbpAppOptionsService.getFilterMenus();
            vm.meetingFilter = {
                status : {
                    "completed_circle" : true
                }
            };

        };

        var constuctUserData = function constuctUserData(users) {
            var userData = _.where(users, {prof_id: String(vm.userDetails.empId)})[0];
            vm.userDetails.name = userData.name;
            vm.userDetails.datauri = userData.datauri;
        };

        vm.onSelectRoom = function onSelectRoom(roomDetails) {
            vm.meetingsList = [];
            vm.isMeetingLoading = true;
            MrbpModelService.getMeetingDetailsByRoomId(roomDetails.roomId).then(function(response) {
                vm.isMeetingLoading = false;
                vm.meetingsList = response.data.plain();
            }, function(error) {

            })
        }
        vm.doLogout = function doLogout() {
            $localStorage.uid = '';
            $state.go('root.login');
        };

        vm.openBookingRoomModel = function openBookingRoomModel() {
        var modalInstance = $uibModal.open({
         templateUrl: 'views/booking/bookingRoom.html',
         controller: 'BookingController'
       });
      };

      init();
}]);
