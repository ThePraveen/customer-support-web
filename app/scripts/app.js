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
            $rootScope.current_user = JSON.parse($cookies.get("current_user"))
        }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/my_issues', {
                templateUrl: 'views/customer/my_issues.html',
                controller: 'IssuesController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/health', {
                templateUrl: 'views/health.html',
                controller: 'HealthCtrl',
                controllerAs: 'health'
            })
            .otherwise({
                redirectTo: '/'
            });
    });