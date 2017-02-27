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
        'ui.bootstrap.datetimepicker'
    ])
    .run(['$rootScope', 'configuration', 'ticketService',
        function ($rootScope, configuration, ticketService) {
            ticketService.configs.get({}, {},
            function success(response) {
                $rootScope.configs = response;
            },
            function failure(response) {
                $rootScope.configs = {};
                $rootScope.configs.issue_types = ["Complaint", "Request"]
            }
        )
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