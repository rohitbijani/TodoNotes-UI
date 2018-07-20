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
    controller: 'noteController'
  })

  .state('home.notes', {
    url: '/notes',
    templateUrl: 'templates/notes.html',
    controller: 'noteController'
  })

  .state('home.reminders', {
    url: '/reminders',
    templateUrl: 'templates/reminders.html',
    controller: 'noteController'
  })

  .state('home.archive', {
    url: '/archive',
    templateUrl: 'templates/archive.html',
    controller: 'noteController'
  })

  .state('home.trash', {
    url: '/trash',
    templateUrl: 'templates/trash.html',
    controller: 'noteController'
  });

});
