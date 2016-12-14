'use strict';
angular.module('mrbpApp')
.service('MrbpAppOptionsService', ['$q', 'MrbpModelService',
	function ( $q, MrbpModelService) {
		var options = {},
			optionsProperties = {
                "filterMenus" : "filterMenus"
            };

		this.loadOptions = function loadOptions() {
			var deferred = $q.defer(),
                promise = deferred.promise;
			MrbpModelService.getMrbpConfiguration().then(function(response) {
				options = response.data.plain()[0].mrbpConfig;
				deferred.resolve(options);
			}, function(err) { 
				deferred.reject(err);
			});
			return promise;
		}

		this.getOptions = function getOptions(property) {
			return options[property];
		};

		this.getFilterMenus = function getFilterMenus() {
			return this.getOptions(optionsProperties.filterMenus);
		};
}]);
