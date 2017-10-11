angular.module('CustomReviewModule.Web')
.controller('CustomReviewModule.Web.blade1Controller', ['$scope', 'CustomReviewModule.WebApi', function ($scope, api) {
    var blade = $scope.blade;
    blade.title = 'CustomReviewModule.Web';

    blade.refresh = function () {
        api.get(function (data) {
            blade.data = data.result;
            blade.isLoading = false;
        });
    }

    blade.refresh();
}]);
