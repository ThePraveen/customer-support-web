'use strict';

customerSupportApp.factory('ticketService', ['$resource', 'configuration', function ($resource, configuration) {

    return {
        configs: $resource(
            configuration.ticketServiceUrl + '/configs',
            {},
            {
                get: {method: 'GET'},
                post: {method: 'POST'}
            }
        )
    }

}]);
