'use strict';
angular.module('mrbpApp')
.service('MrbpModelService', ['$q', 'RestService',
	function ($q, RestService) {

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
			return RestService.all('rooms').doGET();
        };

        this.registerUser = function registerUser(registrationModel) {
			return RestService.one('users/registration').doPOST(registrationModel, null, {}, {
				'Content-Type': 'Application/json'
			});
        };

        this.getMeetingBookingsList = function	getMeetingBookingsList() {
			return RestService.all('meetingroom/bookings/list').doGET();
        };
        //TODO: this api not required for now
        this.filterUserByAttr = function filterUserByAttr(userModel) {
			return RestService.all('user/find').doPOST(userModel, {
				'Content-Type': 'application/json'
			});
        };
}]);
