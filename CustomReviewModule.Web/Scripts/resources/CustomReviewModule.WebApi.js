angular.module('CustomReviewModule.Web')
.factory('CustomReviewModule.WebApi', ['$resource', function ($resource) {
    return $resource('api/CustomReviewModule.Web');
}]);
