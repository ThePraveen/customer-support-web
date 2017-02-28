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
    ('LoginController',
        ['$scope', '$http', '$location','$rootScope', 'configuration',
            function ($scope, $http, $location, $rootScope, configuration) {
                $scope.email = ""
                $scope.password = ""

                $scope.submitLogin = function () {
                    var payload = {
                        "email": $scope.email,
                        "password": $scope.password
                    }

                    $rootScope.loadingView = true;

                    $http.post(configuration.authServiceUrl + '/auth/sign_in', payload)
                        .then(function success(response) {
                                $rootScope.loadingView = false;
                                $scope.current_user =  response.data;
                            },
                            function error(response) {
                                $rootScope.loadingView = false;
                            }
                        )
                }
            }
        ]
    );