customerSupportApp.factory('loginServices', ['$resource', 'configuration', function ($resource, configuration) {
    return $resource(configuration.accountingService + '/login', {}, {
        login: {method: 'GET', cache: false, isArray: false}
        })
    }])
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .service('authService', ['$rootScope', '$cookies', 'loginServices', '$http', '$location', 'configuration',
        function ($rootScope, $cookies, loginServices, $http, $location, configuration) {
        var auth = {
            checkAuthSuccess: function (redirectUrl) {
                var session_id = $cookies.get('_sessionId');
                var user_name = $cookies.get('user_name');
                if (session_id !== undefined && user_name!==undefined) {
                    $rootScope.loggedIn = true;
                    $rootScope.user_name = user_name;
                    $rootScope.loadingView = false;
                    return true;
                } else {
                    //$http.defaults.headers.common['_SESSIONID'] = session_id;
                    $http.post(configuration.authService + '/v1/sign_in')
                        .then(function success(response) {
                                $rootScope.loggedIn = true;
                                $rootScope.user_name = response.data.name;
                                $cookies.put("user_name",$rootScope.user_name);
                                // $location.path(redirectUrl);
                                return true;

                            },
                            function error(response) {
                                $rootScope.loggedIn = false;
                                $location.path('/login');
                            }
                        );
                }
            },
            checkAuthValid : function(redirectUrl){
                $http.get(configuration.accountingService + '/validate_token')
                    .then(function success(response) {
                            $rootScope.loggedIn = true;
                            $rootScope.user_name = response.data.display_name;
                            $cookies.put("user_name",$rootScope.user_name);
                            return true;
                        },
                        function error(response) {
                            $rootScope.loggedIn = false;
                            $location.path('/login');
                        }
                    );
            }
        }
        return auth;
    }]);
