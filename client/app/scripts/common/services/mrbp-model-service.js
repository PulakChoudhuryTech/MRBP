'use strict';
angular.module('mrbpApp')
.service('MrbpModelService', ['$q', 'RestService', '$http',
	function ($q, RestService, $http) {

        this.getUserProfile = function getUserProfile(loginModel) {
			return RestService.one('user/auth').doPOST(loginModel, null, {}, {
				'Content-Type': 'Application/json'
			});
        };

		this.getUsers = function getUsers() {
			return RestService.all('users').doGET();
        };

		this.getUserById = function getUserById(userId) {
			return RestService.one('user/'+ userId).doGET();
        };

        this.createUser = function createUser(userModel) {
			return RestService.all('users/registration').doPOST(userModel);
        };

        this.getRooms = function getRooms() {
			return RestService.all('meetingrooms').doGET();
        };

        this.getMeetingDetailsByRoomId = function getMeetingDetailsByRoomId(roomId) {
			return RestService.all('/meetingroom/bookings/room/' + roomId).doGET();
        };

        this.registerUser = function registerUser(registrationModel) {
			return RestService.one('users/registration').doPOST(registrationModel, null, {}, {
				'Content-Type': 'Application/json'
			});
        };

        this.getMeetingBookingsList = function	getMeetingBookingsList() {
			return RestService.all('meetingroom/bookings/list').doGET();
        };

        this.filterMeetingList = function filterMeetingList(meetingFilterModel) {
        	return RestService.one('meetingroom/bookings/filter').doPOST(meetingFilterModel, null, {}, {
				'Content-Type': 'Application/json'
			});
        };

        //TODO: this api not required for now
        this.filterUserByAttr = function filterUserByAttr(userModel) {
			return RestService.all('user/find').doPOST(userModel, {
				'Content-Type': 'application/json'
			});
        };

        this.getMrbpConfiguration = function getMrbpConfiguration() {
			return RestService.all('/mrbpconfig').doGET();
		};

		this.getOfsEmployeesList = function getOfsEmployeesList() {
			return RestService.all('/externalresources/employeelist').doGET();
		};

		this.startMeeting = function startMeeting(meetingId) {
            return RestService.one("meetingroom/bookings/" + meetingId + "/start").doPUT({}, null, {}, {
                'Content-Type': 'application/json'
            });
		};

		this.stopMeeting = function stopMeeting(meetingId) {
            return RestService.one("meetingroom/bookings/" + meetingId + "/stop").doPUT({}, null, {}, {
                'Content-Type': 'application/json'
            });
		};

		this.cancelMeeting = function cancelMeeting(bookingId) {
			var meetingObj = {
				"bookingId" : bookingId,
				"notification" : false
			};
			return RestService.one("meetingroom/bookings/cancel").doPOST(meetingObj, null, {}, {
				'Content-Type': 'Application/json'
			});;
		};
}]);
