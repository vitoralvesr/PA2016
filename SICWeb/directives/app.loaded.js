angular.module('directives', [])
.directive('ngAppLoaded', function ($timeout) {
	return function(scope) {
	    $timeout(function(){
	    	scope.startView();
	    }, 0);
	}
});