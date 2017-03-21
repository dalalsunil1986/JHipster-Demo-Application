(function() {
    'use strict';

    angular
        .module('blogappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('blog', {
            parent: 'entity',
            url: '/blog?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Blogs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/blog/blogs.html',
                    controller: 'BlogController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
            }
        })
        .state('blog-detail', {
            parent: 'blog',
            url: '/blog/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Blog'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/blog/blog-detail.html',
                    controller: 'BlogDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Blog', function($stateParams, Blog) {
                    return Blog.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'blog',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('blog-detail.edit', {
            parent: 'blog-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/blog/blog-dialog.html',
                    controller: 'BlogDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Blog', function(Blog) {
                            return Blog.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('blog.new', {
            parent: 'blog',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/blog/blog-dialog.html',
                    controller: 'BlogDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                content: null,
                                createdAt: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('blog', null, { reload: 'blog' });
                }, function() {
                    $state.go('blog');
                });
            }]
        })
        .state('blog.edit', {
            parent: 'blog',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/blog/blog-dialog.html',
                    controller: 'BlogDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Blog', function(Blog) {
                            return Blog.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('blog', null, { reload: 'blog' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('blog.delete', {
            parent: 'blog',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/blog/blog-delete-dialog.html',
                    controller: 'BlogDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Blog', function(Blog) {
                            return Blog.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('blog', null, { reload: 'blog' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
