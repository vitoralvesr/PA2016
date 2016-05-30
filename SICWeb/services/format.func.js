angular.module('FormatService', [])
.service('$format', function () {
    this.date = function (date, format, callback) {
    	if (typeof date === 'string') {
    		var arrDate = null;
    		if (date.indexOf('/') !== -1) {
    			arrDate = date.split('/');
    			date = new Date(arrDate[2], parseInt(arrDate[1]) - 1, arrDate[0]);
    		} else {
    			arrDate = date.split('-');
    			date = new Date(arrDate[0], parseInt(arrDate[1]) - 1, arrDate[2]);
    		}
    	}

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        callback(format.replace('dd', day).replace('yyyy', year).replace('MM', (monthIndex + 1 < 10 ? '0' + (parseInt(monthIndex) + 1) : monthIndex + 1)));
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