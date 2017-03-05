'use strict';

/**
 * @ngdoc function
 * @name accountingUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accountingUiApp
 */

customerSupportApp
    .controller
    ('HomeAdminController',
        ['$cookies', '$scope', '$http', '$location','$rootScope', 'configuration',
            function ($cookies, $scope, $http, $location, $rootScope, configuration) {

                $scope.issue_search_form = {}

                $scope.allIssues =  [];

                $scope.fetchIssues = function () {
                    $rootScope.loadingView = true;

                    $http.get(configuration.ticketServiceUrl + '/issues')
                        .then(function success(response) {
                                $rootScope.loadingView = false;
                                $scope.allIssues =  response.data.data.issues;
                            },
                            function error(response) {
                                $rootScope.loadingView = false;
                            }
                        )
                }
            }
        ]
    );
