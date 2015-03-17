'use strict';

angular.module('dating-app', ['ui.router', 'ngSanitize','ngMessages', 'satellizer', 'angularFileUpload'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html', controller: 'HomeCtrl'})

      .state('login', {url:'/login', templateUrl:'/views/users/login.html', controller:'LoginCtrl'})
      .state('register', {url:'/register', templateUrl:'/views/users/register.html', controller:'RegisterCtrl'})

      .state('account', {url: '/account', templateUrl: '/views/account/account.html', abstract: true})
      .state('account.profile', {url: '', templateUrl: '/views/account/profile.html', controller:'AccountProfileCtrl'})
      .state('account.edit', {url: '/edit', templateUrl: '/views/account/edit.html', controller:'AccountEditCtrl'})
      .state('account.upload', {url: '/upload', templateUrl: '/views/account/upload.html', controller:'AccountUploadCtrl'})

      .state('search', {url: '/search', templateUrl: '/views/search/search.html', controller:'SearchCtrl'})

      .state('users', {url: '/users', templateUrl: '/views/users/users.html', abstract: true})
      .state('users.show', {url: '/{userId:[0-9a-f]{24}}', templateUrl: '/views/users/users-show.html', controller: 'UsersShowCtrl'})

      .state('gifts', {url: '/gifts', templateUrl: '/views/gifts/gifts.html', abstract: true})
      .state('gifts.store', {url: '', templateUrl: '/views/gifts/gifts-store.html', controller: 'GiftsStoreCtrl'})
      .state('gifts.sent', {url: '/sent', templateUrl: '/views/gifts/gifts-sent.html', controller: 'GiftsSentCtrl'})
      .state('gifts.received', {url: '/received', templateUrl: '/views/gifts/gifts-received.html', controller: 'GiftsReceivedCtrl'})
      .state('gifts.create', {url: '/create', templateUrl: '/views/gifts/gifts-create.html', controller: 'GiftsCreateCtrl'});

    $authProvider.facebook({ clientId: '1609867685900087' });
  }])
  .run(['$rootScope', '$window', '$auth',  function($rootScope, $window, $auth){
    if ($auth.isAuthenticated()) {
      $rootScope.user = JSON.parse($window.localStorage.user);
    }
  }]);
