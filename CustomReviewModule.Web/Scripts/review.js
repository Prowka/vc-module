//Call this to register our module to main application
var moduleTemplateName = "customReviewModule";

if (AppDependencies != undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, ['ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.validate'])
    .config(
    ['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('workspace.customReviewModule', {
                    url: '/review',
                    templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                    controller: [
                        '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                            var newBlade = {
                                id: 'blade1',
                                title: 'Тестовый тайтл',
                                controller: 'customReviewModule.mainController',
                                template: 'Modules/VirtoCommerce.CustomReview/Scripts/blades/review-main.tpl.html',
                                isClosingDisabled: true
                            };
                            bladeNavigationService.showBlade(newBlade);
                            $scope.moduleName = "vc-review";
                        }
                    ]
                });
        }
    ])
    .run(
    ['$rootScope', 'platformWebApp.mainMenuService', 'platformWebApp.widgetService', '$state', 'platformWebApp.authService',
        function ($rootScope, mainMenuService, widgetService, $state, authService) {
            //Register module in main menu
            var menuItem = {
                path: 'browse/review',
                icon: 'fa fa-cube',
                title: 'Отзывы о товарах',
                priority: 100,
                action: function () { $state.go('workspace.customReviewModule') },
                permission: 'customReviewModulePermission'
            };
            mainMenuService.addMenuItem(menuItem);


            //Модуль в каталоге товаров (просмотр)
            var itemReviewWidget = {
                isVisible: function (blade) { return authService.checkPermission('customReviewModulePermission'); },
                controller: 'customReviewModule.reviewWidgetController',
                size: [2, 1],
                template: 'Modules/VirtoCommerce.CustomReview/Scripts/widgets/reviewWidget.tpl.html'
            };
            widgetService.registerWidget(itemReviewWidget, 'itemDetail');
        }
    ]);
