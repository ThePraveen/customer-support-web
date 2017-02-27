'use strict';

customerSupportApp.factory('ticketService', ['$resource', 'configuration', function ($resource, configuration) {

    return {
        configs: $resource(
            configuration.ticketService + '/configs',
            {},
            {
                get: {method: 'GET'},
                post: {method: 'POST'}
            }
        )
    }

}]);
