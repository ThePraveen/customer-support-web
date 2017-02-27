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
    ('HomeController',
        ['$scope', '$http', '$location', '$rootScope',
            function ($scope, $http, $location, $rootScope) {

                if($location.search().page_number)
                    $scope.page_number = parseInt($location.search().page_number, 10)
                else
                    $scope.page_number = 1

                $scope.agency_form = {}
                if ($location.search().city){
                    $scope.agency_form.city = $location.search().city
                }
                if ($location.search().agency_id){
                    $scope.agency_form.agency_id = $location.search().agency_id
                }

                $scope.allAgencies =  [];

                var url = "/";
                // authService.checkAuthSuccess(url);


                $scope.fetchAgencies = function (page_number_param) {
                    $rootScope.loadingView = true;
                    $scope.page_number = page_number_param;
                    $location.search('page_number', page_number_param);
                    var payload = {"page_number": page_number_param}

                    if($scope.agency_form.agency_id){
                        payload.id = $scope.agency_form.agency_id
                        $location.search('agency_id', $scope.agency_form.agency_id);
                    }
                    if($scope.agency_form.city){
                        payload.city = $scope.agency_form.city
                        $location.search('city', $scope.agency_form.city);
                    }
                    accountingServices.agencies.get(payload,{},
                        function success(response) {
                            $rootScope.loadingView = false;
                            $scope.allAgencies =  response;
                        },
                        function failure(response) {
                            $rootScope.loadingView = false;
                            $scope.getallAgenciesError =  "Failed to fetch agencies. Make sure you have selected at least one filter";
                        }
                    );
                }

                $scope.getAgency = function (agency) {
                    $http.get(configuration.accountingService + '/ims/agencies/'+ agency.id)
                        .then(function success(response) {
                                if(response.data.current_balance!==undefined)
                                    agency.current_balance = response.data.current_balance;
                                else
                                    agency.current_balance = "No Transactions yet";
                            },
                            function error(response) {
                                agency.current_balance = "Failed to fetch";
                            }
                        )
                }

                $scope.getAgencyBalance = function (agency) {
                    $http.get(configuration.accountingService + '/wallets/balance?wallet_id='+ agency.wallet_id)
                        .then(function success(response) {
                                agency.wallet_balance = response.data[0].ola_money_balance;
                            },
                            function error(response) {
                                agency.wallet_balance = "Failed to fetch"
                            }
                        )
                }

            }
        ]
    );
