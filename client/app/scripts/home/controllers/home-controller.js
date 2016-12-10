'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * # LoginController
 * Controller of the login
 */
angular.module('mrbpApp')
    .controller('homeController', ['$scope', 'MrbpModelService', '$cookieStore', function ($scope, MrbpModelService, $cookieStore) {

        var vm = this;
        console.log('home controller');

        var init = function init() {
            // $(function(){
                $('[data-toggle="tooltip"]').tooltip();
                $(".side-nav .collapse").on("hide.bs.collapse", function() {
                    $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
                });
            $('.side-nav .collapse').on("show.bs.collapse", function() {
                $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
            });
        // })
        };

        init();
}]);
