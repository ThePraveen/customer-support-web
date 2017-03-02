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
  ('LandingController',
    ['$scope', '$http', '$location','$rootScope', '$cookies', 'configuration',
      function ($scope, $http, $location, $rootScope, $cookies, configuration) {

        $rootScope.error = null

        $scope.email = null
        $scope.password = null
        $scope.role = null

        $scope.roles = ["Customer", "Admin", "Executive"]

        // submit login method
        $scope.submitLogin = function () {
          console.log($scope);
          $scope.role = $scope.role.toLowerCase();

          var payload = {
            "email": $scope.email,
            "password": $scope.password,
            "role": $scope.role
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
                $rootScope.current_user = JSON.parse($cookies.get("current_user"));

                switch($scope.role) {
                  case "customer":
                    console.log("redirecting to /customer")
                    $location.path('/customer');
                    break;
                  case "executive":
                    console.log("redirecting to /executive")
                    $location.path('/executive');
                    break;
                  case "admin":
                    console.log("redirecting to /admin")
                    $location.path('/admin');
                  default:
                    console.log("redirecting to /")
                    $location.path('/');
                    break;
                }
              },
              function error(response) {
                $rootScope.loadingView = false;
                $rootScope.error = "Failed to login, Verify your logon credentials";
              }
            )
        }
      }
    ]
  );
