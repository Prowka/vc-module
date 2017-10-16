angular.module('customReviewModule')
    .controller('customReviewModule.mainController', ['$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
        $scope.selectedNodeId = null;

        function initializeBlade() {
            var entities = [
                { name: 'Все отзывы', entityName: 'allReview', icon: 'fa-usd' },
                { name: 'Отзывы на модерации', entityName: 'noApproved', icon: 'fa-anchor' }];

            $scope.blade.currentEntities = entities;
            $scope.blade.isLoading = false;

            //$scope.blade.openBlade(entities[0]);
        };

        $scope.blade.openBlade = function (data) {
            $scope.selectedNodeId = data.entityName;

            var newBlade = {
                id: 'reviewList',
                title: data.name,
                //controller: 'virtoCommerce.pricingModule.' + data.entityName + 'ListController',
                //template: 'Modules/$(VirtoCommerce.Pricing)/Scripts/blades/' + data.entityName + '-list.tpl.html'
            };
            bladeNavigationService.showBlade(newBlade, $scope.blade);
        }

        $scope.blade.headIcon = 'fa-usd';

        initializeBlade();
    }]);
