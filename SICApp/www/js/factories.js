angular.module('starter.services', []).
service('HttpFunctions', function ($http) {
    // HTTP GET
    this.get = function (url, params, success, error) {
        $http.get(url)
        .then(
            function (response) {
                success(response.data);
            },
            function (response) {
                error(response);
            }
        );
    };
});
