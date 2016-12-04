'use strict';
angular.module('mrbpApp')
.service('MrbpHelperService', [
	function () {

        var userProfile;

        this.setUserDetails = function setUserDetails(profile) {
			userProfile = profile;
        };

        this.getUserDetails = function getUserDetails() {
			return userProfile;
        };
}]);
