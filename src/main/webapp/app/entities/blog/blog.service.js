(function() {
    'use strict';
    angular
        .module('blogappApp')
        .factory('Blog', Blog);

    Blog.$inject = ['$resource', 'DateUtils'];

    function Blog ($resource, DateUtils) {
        var resourceUrl =  'api/blogs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
