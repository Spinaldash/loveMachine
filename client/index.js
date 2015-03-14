'use strict';

angular.module('dating-app', ['ui.router', 'ngSanitize','ngMessages', 'satellizer'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html', controller: 'HomeCtrl'})

      .state('login', {url:'/login', templateUrl:'/views/users/login.html', controller:'LoginCtrl'})
      .state('register', {url:'/register', templateUrl:'/views/users/register.html', controller:'RegisterCtrl'})

      .state('account', {url: '/account', templateUrl: '/views/account/account.html', abstract: true})
      .state('account.profile', {url: '', templateUrl: '/views/account/profile.html', controller:'AccountProfileCtrl'})
      .state('account.edit', {url: '/edit', templateUrl: '/views/account/edit.html', controller:'AccountEditCtrl'});

    $authProvider.facebook({ clientId: '1609867685900087' });
  }])
  .run(['$rootScope', '$window', '$auth',  function($rootScope, $window, $auth){
    if ($auth.isAuthenticated()) {
      $rootScope.user = JSON.parse($window.localStorage.user);
    }
  }]);
