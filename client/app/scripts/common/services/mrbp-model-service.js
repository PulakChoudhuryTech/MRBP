'use strict';
angular.module('mrbpApp')
.service('MrbpModelService', ['$q', 'RestService',
	function ($q, RestService) {

        this.getUserProfile = function getUserProfile() {
			return RestService.one('user').doGET();
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

        //TODO: this api not required for now
        this.filterUserByAttr = function filterUserByAttr(userModel) {
			return RestService.all('user/find').doPOST(userModel, {
				'Content-Type': 'application/json'
			});
        };
}]);
