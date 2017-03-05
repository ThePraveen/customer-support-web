'use strict';

/**
 * @ngdoc overview
 * @name customerSupportWebApp
 * @description
 * # customerSupportWebApp
 *
 * Main module of the application.
 */
var customerSupportApp = angular
    .module('customerSupportWebApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngFileUpload',
        'ui.bootstrap',
    ])
    .run(['$cookies', '$rootScope',
        function ($cookies, $rootScope) {
            if($cookies.get("current_user") != null){
                $rootScope.current_user = JSON.parse($cookies.get("current_user"));
            }
        }])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/landing.html',
                controller: 'LandingController'
            })
            .when('/customer', {
                templateUrl: 'views/customer/home.html',
                controller: 'HomeCustomerController'
            })
            .when('/customer/new_issue', {
                templateUrl: 'views/customer/new_issue.html',
                controller: 'HomeCustomerController'
            })
            .when('/executive', {
                templateUrl: 'views/executive/home.html',
                controller: 'HomeExecutiveController'
            })
            .when('/admin', {
                templateUrl: 'views/admin/home.html',
                controller: 'HomeAdminController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });
