'use strict';

/**
 * @ngdoc overview
 * @name customerSupportWebApp
 * @description
 * # customerSupportWebApp
 *
 * Main module of the application.
 */
angular
  .module('customerSupportWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
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
