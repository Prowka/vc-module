angular.module('customReviewModule')
    .factory('customReviewModule.reviewApi', ['$resource', function ($resource) {
        return $resource('api/review/product', { productId: '@productId', id: '@Id' }, {
            getReviewsByProductId: { url: 'api/review/:productId/product' },
            getReviewsListForProduct: { url: 'api/review/reviewlist/:productId/product'},
            getReviewById: { url: 'api/review/:id' },
            remove: { method: 'DELETE', url: 'api/review/product' },
            save: { methos: 'PUT', url: ''}
        });
}]);