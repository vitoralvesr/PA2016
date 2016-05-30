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
    this.post = function (url, data, success, error) {
        $http({
            url: url,
            method: "POST",
            data: data
        }).then(function(response) {
            success(response);
        },function(ex) {
            error(ex);
        });
    };
});