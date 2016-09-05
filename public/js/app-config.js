angular
    .module('myApp', [
        'ui.router',                    // Routing
        //'oc.lazyLoad',                  // ocLazyLoad
        //'ui.bootstrap',                 // Ui Bootstrap
        'ngCookies'
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
    //console.log("config");
    $urlRouterProvider.otherwise("/home");

    // $ocLazyLoadProvider.config({
    //     // Set to true if you want to see what and when is dynamically loaded
    //     debug: false
    // });

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
            controller: 'HomeController as home'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            controller: 'LoginController as login'
        })
        .state('ao', {
            url: '/ao',
            templateUrl: 'pages/ao.html',
            //controller: 'AoController as ao'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'pages/chat.html',
            //controller: 'AoController as ao'
        })
        .state('logout', {
            url: '/logout',
            controller: 'LogoutController as logout'
        })
    ;
    })
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });
