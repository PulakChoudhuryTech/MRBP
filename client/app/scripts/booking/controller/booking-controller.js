'use strict';

/**
 * @ngdoc function
 * @name bookingController
 * @description
 * # bookingController
 * Controller of the meeting room booking
 */
angular.module('mrbpApp')
    .controller('BookingController', ['$scope', '$state', '$localStorage', 'MrbpModelService', 'MrbpHelperService', 'MrbpAppOptionsService', function ($scope, $state, $localStorage, MrbpModelService, MrbpHelperService, MrbpAppOptionsService) {
        var init = function init() {
          $scope.mytime = new Date();

           $scope.hstep = 1;
           $scope.mstep = 5;

           $scope.newBookingObject={};
           $scope.newBookingObject.bookedBy={};
           var userDetails = MrbpHelperService.getUserDetails();
           $scope.newBookingObject.bookedBy.name=userDetails.name;
           $scope.newBookingObject.bookedBy.userId=userDetails.id;
        /*   "roomId": "58435e53e2405e134ce10afc",
   "bookingDtm": 1468065655000,
   "bookingFromDtm": 1483019032000,
   "bookingToDtm": 1483026232000,
   "notification": false,
   "meetingTitle" : "Vault Scrum call",
   "bookedBy": {
     "name": "Nithin S",
     "userId": "584d594e9209e2117c487f9f"
   },
   "attendies": [
     {
       "name": "Pulak",
       "empId": 1082,
       "email": "pulakdj89@gmail.com"
     },*/

           $scope.setCurrentDate = function() {
             $scope.newBookingObject.bookingDtm = new Date();
           };
           $scope.setCurrentDate();

           $scope.options = {
             hstep: [1, 2, 3],
             mstep: [1, 5, 10, 15, 25, 30]
           };

           $scope.ismeridian = true;
           $scope.name = 'bottom';

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

           $scope.loadEmployeeDetail=function($query)
           {
             return MrbpHelperService.getEmployeeList($query);
           }

           $scope.bookTheMeeting=function()
           {
             $scope.newBookingObject.bookingFromDtm=$scope.dateRangeStart;
             $scope.newBookingObject.bookingToDtm=$scope.dateRangeEnd;
             console.log($scope.newBookingObject);
           }

        }
        init();
}]);
