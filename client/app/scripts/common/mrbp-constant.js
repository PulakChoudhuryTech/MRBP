/**
 * @ngdoc constants
 * @id mrbpApp
 * @name mrbpConst
 *
 * @description
 * RDVNG application constants.
 */

'use strict';

angular.module('mrbpApp').constant('mrbpConst', {

    MEETINGS : {
        STATUS : {
            IN_PROGRESS : 'IN_PROGRESS',
            NOT_STARTED : 'NOT_STARTED',
            COMPLETED : 'COMPLETED',
            CANCELLED: 'CANCELLED'
        },
        ROLES: {
        	cancelled_circle : "CANCELLED",
        	completed_circle : "COMPLETED",
        	inprogress_circle : "IN_PROGRESS",
        	allFilter_circle : [ "CANCELLED", "COMPLETED", "IN_PROGRESS", "NOT_STARTED" ],
        	notStarted_circle : "NOT_STARTED"
        }
    }

});
