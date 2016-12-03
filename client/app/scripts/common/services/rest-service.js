'use strict';

angular.module('mrbpApp').factory('RestService',
    function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {

            RestangularConfigurer.setBaseUrl('http://localhost:3000/mrbp/api');

            RestangularConfigurer.setDefaultHeaders({
                // 'Authorization': 'Basic c3R1ZGE6c3R1ZGE='
            });
            // Set full response on to get status code
            RestangularConfigurer.setFullResponse(true);
            // Cachebuster for IE 9 cache issue
            RestangularConfigurer.setFullRequestInterceptor(function(element, operation, what, url, headers, params) {
                if (operation === 'getList' || operation === 'get') {
                    return {
                        headers: headers,
                        params: _.extend(params, {
                            cache: new Date().getTime()
                        }),
                        element: element
                    };
                }
            });
        });
    }
);
