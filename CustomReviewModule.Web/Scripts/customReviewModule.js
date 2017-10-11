//Call this to register our module to main application
var moduleTemplateName = "customReviewModule";

if (AppDependencies != undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('workspace.customReviewModule', {
                url: '/customReviewModule',
                templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                controller:[
                    '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                        var newBlade = {
                            id: 'blade1',
                            controller: 'customReviewModule',
                            template: 'Modules/$(customReviewModule)/Scripts/blades/helloWorld_blade1.tpl.html',
                            isClosingDisabled: true
                        };
                        bladeNavigationService.showBlade(newBlade);
                    }
                ]
            });
    }
])
.run(['$rootScope', 'platformWebApp.mainMenuService', 'platformWebApp.widgetService', '$state',
    function ($rootScope, mainMenuService, widgetService, $state) {
        //Register module in main menu
        var menuItem = {
            path: 'browse/customReviewModule',
            icon: 'fa fa-cube',
            title: 'Отзывы о товарах',
            priority: 100,
            action: function () { $state.go('workspace.customReviewModule') },
            permission: 'customReviewModule.Permission'
        };
        mainMenuService.addMenuItem(menuItem);
    }
]);
