'use strict';
angular.module('mrbpApp')
.service('MrbpHelperService', [
	function () {

        var userProfile,
        	empList;

        this.setUserDetails = function setUserDetails(profile) {
			userProfile = profile;
        };

        this.getUserDetails = function getUserDetails() {
			return userProfile;
        };

        this.setEmployeeList = function setEmployeeList(list) {
        	empList = list;
        };

        this.getEmployeeList = function getEmployeeList() {
			return empList;
        };
}]);
