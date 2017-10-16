angular.module('customReviewModule')
    .factory('customReviewModule.reviewApi', ['$resource', function ($resource) {
        return $resource('api/review/product',{ productId: '@Id' }, {
            getReviewsByProductId: { url: 'api/review/:id/product' },
            getReviewsListForProduct: { url: 'api/review/reviewlist/:id/product' },
        });
}]);