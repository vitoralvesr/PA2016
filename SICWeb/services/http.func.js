angular.module('services', [])
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
})
.service('$format', function () {
    this.formatDate = function (date, callback) {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        callback(year + '-' + (monthIndex + 1 < 10 ? '0' + (parseInt(monthIndex) + 1) : monthIndex + 1) + '-' + day);
    };

    this.parameters = function (filtros) {
        var obj = {};

        for(var attr in filtros){
            if (filtros[attr] !== undefined && filtros[attr] !== null) {
                obj[attr] = filtros[attr];
            }
        }

        return obj;
    }
});