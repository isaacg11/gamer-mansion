namespace gamermansion {

    angular.module('gamermansion', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngMaterial', 'ngMessages']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
        .state('login', {
            url: '/',
            templateUrl: '/ngApp/views/login.html',
            controller: gamermansion.Controllers.LoginController,
            controllerAs: 'controller'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/ngApp/views/register.html',
            controller: gamermansion.Controllers.RegisterController,
            controllerAs: 'controller'
        })
            .state('home', {
                url: '/home',
                templateUrl: '/ngApp/views/home.html',
                controller: gamermansion.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('add', {
                url: '/add',
                templateUrl: '/ngApp/views/addGames.html',
                controller: gamermansion.Controllers.AddGamesController,
                controllerAs: 'controller'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/views/editGames.html',
                controller: gamermansion.Controllers.EditGamesController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
