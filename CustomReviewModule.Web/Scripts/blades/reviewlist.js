angular.module('customReviewModule')
    .controller('customReviewModule.reviewListController', ['$scope', 'customReviewModule.reviewApi', 'platformWebApp.dialogService', 'platformWebApp.uiGridHelper', 'platformWebApp.bladeUtils',
        function ($scope, reviewApi, dialogService, uiGridHelper, bladeUtils) {
            var blade = $scope.blade;
            var bladeNavigationService = bladeUtils.bladeNavigationService;

            blade.refresh = function (parentRefresh) {
                blade.isLoading = true;

                return reviewApi.getReviewsListForProduct({ id: blade.currentEntityId }, function (data) {
                    blade.isLoading = false;
                    blade.currentEntities = data.result;
                    $scope.pageSettings.totalItems = data.totalCount;

                    if (parentRefresh === true && blade.parentRefresh) {
                        blade.parentRefresh();
                    }

                    return data;
                }).$promise;
            };

            $scope.selectNode = function (node, isNew) {
                $scope.selectedNodeId = node.id;

                var newBlade = {
                    id: 'listItemChild',
                    controller: 'customReviewModule.reviewDetailController',
                    template: 'Modules/VirtoCommerce.CustomReview/Scripts/blades/review-detail.tpl.html'
                };

                if (isNew) {
                    angular.extend(newBlade, {
                        title: 'Новый отзыв',
                        isNew: true,
                        productId: blade.currentEntityId,
                        saveCallback: function (newReview) {
                            newBlade.isNew = false;
                            blade.refresh(true).then(function () {
                                newBlade.currentEntityId = newReview.id;
                                bladeNavigationService.showBlade(newBlade, blade);
                            });
                        }
                        // onChangesConfirmedFn: callback,
                    });
                } else {
                    angular.extend(newBlade, {
                        currentEntityId: node.id,
                        title: node.author,
                        subtitle: blade.subtitle
                    });
                }

                bladeNavigationService.showBlade(newBlade, blade);
            };

            function isItemsChecked() {
                return $scope.gridApi && _.any($scope.gridApi.selection.getSelectedRows());
            }

            $scope.deleteList = function (list) {
                var dialog = {
                    id: "confirmDeleteItem",
                    title: "pricing.dialogs.pricelists-delete.title",
                    message: "pricing.dialogs.pricelists-delete.message",
                    callback: function (remove) {
                        if (remove) {
                            bladeNavigationService.closeChildrenBlades(blade, function () {
                                pricelists.remove({ ids: _.pluck(list, 'id') },
                                    blade.refresh(true),
                                    function (error) { bladeNavigationService.setError('Error ' + error.status, blade); });
                            });
                        }
                    }
                }
                dialogService.showConfirmationDialog(dialog);
            }

            blade.headIcon = 'fa-usd';
            blade.subtitle = 'pricing.blades.pricelist-list.subtitle';

            blade.toolbarCommands = [
                {
                    name: "platform.commands.refresh", icon: 'fa fa-refresh',
                    executeMethod: blade.refresh,
                    canExecuteMethod: function () { return true; }
                },
                {
                    name: "platform.commands.add", icon: 'fa fa-plus',
                    executeMethod: function () {
                        $scope.selectNode({}, true);
                    },
                    canExecuteMethod: function () {
                        return true;
                    },
                    permission: 'pricing:create'
                },
                {
                    name: "platform.commands.delete", icon: 'fa fa-trash-o',
                    executeMethod: function () {
                        $scope.deleteList($scope.gridApi.selection.getSelectedRows());
                    },
                    canExecuteMethod: isItemsChecked,
                    permission: 'pricing:delete'
                }
            ];

            var filter = $scope.filter = {};
            filter.criteriaChanged = function () {
                if ($scope.pageSettings.currentPage > 1) {
                    $scope.pageSettings.currentPage = 1;
                } else {
                    blade.refresh();
                }
            };

            // ui-grid
            $scope.setGridOptions = function (gridOptions) {
                $scope.gridOptions = gridOptions;

                gridOptions.onRegisterApi = function (gridApi) {
                    gridApi.core.on.sortChanged($scope, function () {
                        if (!blade.isLoading) blade.refresh();
                    });
                };

                bladeUtils.initializePagination($scope);
            };

            // actions on load
            //blade.refresh();
        }]);