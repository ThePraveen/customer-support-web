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
    ('HomeCustomerController',
        ['$cookies', '$scope', '$http', '$location','$rootScope', 'configuration',
            function ($cookies, $scope, $http, $location, $rootScope, configuration) {

                $scope.issue_search_form = {}

                $scope.allIssues =  [];

                $scope.fetchIssues = function () {
                    $rootScope.loadingView = true;

                    $http.get(configuration.ticketServiceUrl + '/issues?customer_id=' + $rootScope.current_user['customer']['id'])
                        .then(function success(response) {
                                $rootScope.loadingView = false;
                                $scope.allIssues =  response.data.data.issues;
                            },
                            function error(response) {
                                $rootScope.loadingView = false;
                            }
                        )
                }


                $scope.createIssue = function () {
                    var paylod = {
                        "customer_id": $rootScope.current_user['customer']['id'],
                        "title": $scope.title,
                        "description": $scope.description
                    }
                    $http.post(configuration.ticketServiceUrl + '/issues', paylod)
                        .then(function success(response) {
                                $scope.title = ""
                                $scope.description = ""                                
                                $rootScope.loadingView = false;
                                $rootScope.success = response.data.data.message;
                            },
                            function error(response) {
                                $rootScope.loadingView = false;
                                $rootScope.error = "Failed to create Issue";
                            }
                        )

                }
            }
        ]
    );
