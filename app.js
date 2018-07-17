var myApp=angular.module('myApp',['ui.router','ngMaterial']);

myApp.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/login')
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'userController'
  })

  .state('register', {
    url: '/registration',
    templateUrl: 'templates/registration.html',
    controller: 'userController'
  })

  .state('forgotPassword', {
    url: '/forgot-password',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'userController'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeController'
  })

  .state('home.dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardController'
  });

});
