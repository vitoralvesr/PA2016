angular.module('HttpService', [])
.service('$httpFunctions', function ($http) {
    // HTTP GET
    this.get = function (url, params, success, error) {
        $http({
            url: url,
            method: "GET",
            params: params
        }).then(function(response) {
            success(response);
        },function(ex) {
            error(ex);
        });
    };

    // HTTP POST
    this.post = function (uri, dt, success, error) {
        $http({
            url: uri,
            method: "POST",
            data: dt
        }).then(function(response) {
            success(response);
        },function(ex) {
            error(ex);
        });
    };
});