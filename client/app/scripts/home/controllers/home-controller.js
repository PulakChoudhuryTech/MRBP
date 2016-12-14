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

            if (!$localStorage.uid) {
                $state.go('root.login');
                return;
            }

            //gets user details from helper service
            vm.userDetails = MrbpHelperService.getUserDetails();
            //constuctUserData(MrbpHelperService.getEmployeeList());

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
            MrbpModelService.getMeetingDetailsByRoomId(roomDetails.roomId).then(function(response) {
                vm.meetingsList = response.data.plain();
            }, function(error) {

            })
        }
        vm.doLogout = function doLogout() {
            $localStorage.uid = '';
            $state.go('root.login');
        };

        vm.openBookingRoomModel = function openBookingRoomModel() {
  console.log("working");
      var modalInstance = $uibModal.open({
         templateUrl: 'views/booking/bookingRoom.html',
         controller: function($scope) {
           $scope.mytime = new Date();

            $scope.hstep = 1;
            $scope.mstep = 5;

            $scope.options = {
              hstep: [1, 2, 3],
              mstep: [1, 5, 10, 15, 25, 30]
            };

            $scope.ismeridian = true;
            $scope.name = 'bottom';
            $scope.today = function() {
              $scope.dt = new Date();
              $scope.dt2 =$scope.dt;
            };
            $scope.today();
            $scope.open1 = function() {
              $scope.popup1.opened = true;
            };
            $scope.open2 = function() {
              $scope.popup2.opened = true;
            };
            $scope.popup1 = {
              opened: false
            };
            $scope.popup2 = {
              opened: false
            };
            $scope.onLoad=function(e, reader, file, fileList, fileOjects, fileObj) {
              console.log(fileObj);
            }
         }
       });
};


        init();
}]);
