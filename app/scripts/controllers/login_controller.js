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
        ['$scope', '$http', '$location','$rootScope', '$cookies', 'configuration',
            function ($scope, $http, $location, $rootScope, $cookies, configuration) {
                $scope.email = ""
                $scope.password = ""

                $scope.submitLogin = function (redirect_url) {
                    var payload = {
                        "email": "admin@awign.com",
                        "password": "11111111"
                        // "email": $scope.email,
                        // "password": $scope.password
                    }

                    $rootScope.loadingView = true;
                    $http.post(configuration.authServiceUrl + '/auth/sign_in', payload)
                        .then(function success(response){
                                $rootScope.loadingView = false;
                                var user = response.data.data;
                                var header = response.headers();
                                var header_data =
                                    {
                                        'access-token': header['access-token'],
                                        'client': header['client'],
                                        'expiry': header['expiry'],
                                        'uid': header['uid'],
                                        'name': user['name'],
                                        'id': user['id']
                                    };
                                $cookies.put("current_user", JSON.stringify(header_data));
                                $location.path('/my_issues');
                            },
                            function error(response) {
                                $rootScope.loadingView = false;
                            }
                        )
                }
            }
        ]
    );