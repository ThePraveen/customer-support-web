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

                // authService.authenticateUser(url);

                if($location.search().page_number)
                    $scope.page_number = parseInt($location.search().page_number, 10)
                else
                    $scope.page_number = 1

                $scope.issue_search_form = {}

                $scope.allIssues =  [];

                $scope.fetchIssues = function (page_number_param) {
                    $rootScope.loadingView = true;
                    $scope.page_number = page_number_param;
                    $location.search('page_number', page_number_param);

                    var payload = {"page_number": page_number_param}

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
