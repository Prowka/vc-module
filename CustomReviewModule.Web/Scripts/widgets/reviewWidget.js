angular.module('customReviewModule')
    .controller('customReviewModule.reviewWidgetController',
    ['$scope', 'platformWebApp.bladeNavigationService', 'customReviewModule.reviewApi',
        function ($scope, bladeNavigationService, reviewApi) {

            var blade = $scope.widget.blade;

            function refresh() {
                $scope.reviewCount = '...';
                $scope.reviewText = '...';

                reviewApi.getReviewsByProductId({ id: blade.currentEntityId }, function (data) {
                    $scope.reviewCount = data.count;
                    $scope.reviewText = data.text;
                });
            }

            $scope.openBlade = function () {
                var newBlade = {
                    id: "reviewlistChild",
                    currentEntityId: blade.currentEntityId,
                    parentWidgetRefresh: refresh,
                    title: blade.title,
                    subtitle: 'Все отзывы о продукте',
                    controller: 'customReviewModule.reviewListController',
                    template: 'Modules/VirtoCommerce.CustomReview/Scripts/blades/reviewlist.tpl.html'
                };

                bladeNavigationService.showBlade(newBlade, blade);
            };

            refresh();
        }]);