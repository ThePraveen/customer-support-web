customerSupportApp.controller('NavigationController',['$location', '$rootScope', '$scope','$cookies', function ($location, $rootScope, $scope,$cookies) {

    $scope.logout = function(){
        console.log("loging out")
        $cookies.remove("_sessionId");
        $cookies.remove("current_user");
        $rootScope.current_user = null
        $location.path("/")
    }

}])
