'use strict';

/**
 * @ngdoc function
 * @name HomeController
 * @description
 * # HomeController
 * Controller of the home page
 */
angular.module('mrbpApp')
    .controller('HomeController', 
        ['$scope', 
        '$state',
        '$localStorage',
        'MrbpModelService',
        'MrbpHelperService', 
        'MrbpAppOptionsService',
        '$uibModal', 
        'mrbpConst',
        function ( $scope, 
                   $state, 
                   $localStorage, 
                   MrbpModelService, 
                   MrbpHelperService, 
                   MrbpAppOptionsService, 
                   $uibModal,
                   mrbpConst) {

        var vm = this;

        vm.doLogout = function doLogout() {
            $localStorage.uid = '';
            $state.go('root.login');
        };

        vm.onSelectRoom = function onSelectRoom(roomDetails) {
            vm.meetingsList = [];
            vm.isMeetingLoading = true;
            MrbpModelService.getMeetingDetailsByRoomId(roomDetails.roomId).then(function(response) {
                vm.isMeetingLoading = false;
                vm.meetingsList = response.data.plain();
            }, function(error) {

            })
        };

        vm.openBookingRoomModel = function openBookingRoomModel() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/booking/bookingRoom.html',
                controller: 'BookingController'
            });
        };

        vm.onStartMeeting = function onStartMeeting(meetingId) {
            MrbpModelService.startMeeting(meetingId).then(function(response) {
                filterMeetings();
            }, function(error) {
                console.log(error);
            });
        };

        vm.onStopMeeting = function onStopMeeting(meetingId) {
            MrbpModelService.stopMeeting(meetingId).then(function(response) {
                filterMeetings();
            }, function(error) {
                console.log(error);
            });
        };

        vm.onFilterByStatus = function onFilterByStatus(role) {
            vm.meetingFilterPayload.status = [];
            var isAllStatusSelected = false;
            if (role === 'allFilter_circle' && vm.meetingFilter.status.allFilter_circle) {
                selectAllFilter();
               vm.meetingFilterPayload.status = vm.appConstant.MEETINGS.ROLES["allFilter_circle"];
            } else {
                for (var item in vm.meetingFilter.status) {
                    if (role === 'allFilter_circle') {
                        //deselects all filter
                        vm.meetingFilter.status[item] = false;
                    } else {
                        vm.meetingFilter.status.allFilter_circle = false;
                    }
                    if (vm.meetingFilter.status[item]) {
                        // isAllStatusSelected = false;
                        vm.meetingFilterPayload.status.push(vm.appConstant.MEETINGS.ROLES[item])
                    }
                }
            }
            filterMeetings();
        };

        var selectAllFilter = function selectAllFilter() {
            for (var item in vm.meetingFilter.status) {
                vm.meetingFilter.status[item] = true;
            }
        };

        //==============================================================================//
        //      PRIVATES
        //==============================================================================//
        
        var constuctUserData = function constuctUserData(users) {
            var userData = _.where(users, {prof_id: String(vm.userDetails.empId)})[0];
            vm.userDetails.name = userData.name;
            vm.userDetails.datauri = userData.datauri;
        };

        var filterMeetings = function filterMeetings() {
            vm.isMeetingLoading = true;
            MrbpModelService.filterMeetingList(vm.meetingFilterPayload).then(function (response) {
                vm.meetingsList = response.data.plain();
                vm.isMeetingLoading = false;
            }, function(error) {});
        };

        var init = function init() {
            //meeting filter object
            vm.meetingFilterPayload = {};

            //loads application constant
            vm.appConstant = mrbpConst;
            vm.meetingStatus = mrbpConst.MEETINGS.STATUS;

            //validates local storage for valid user id
            if (!$localStorage.uid) {
                $state.go('root.login');
                return;
            }

            //gets user details from helper service
            vm.userDetails = MrbpHelperService.getUserDetails();
            constuctUserData(MrbpHelperService.getEmployeeList());

            //filters meeting based on default values

            //gets list of rooms
            MrbpModelService.getRooms().then(function (response) {
                vm.roomsList = response.data.plain();
            }, function(error) {});

            vm.filterMenus = MrbpAppOptionsService.getFilterMenus();
            vm.meetingFilter = MrbpAppOptionsService.getDefaultMeetingFilters();
            vm.onFilterByStatus();
        };

      init();
}]);
