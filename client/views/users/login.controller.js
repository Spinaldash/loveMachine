'use strict';

angular.module('dating-app')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', '$location', function($rootScope, $scope, $window, $state, $auth, $location){
    if ($rootScope.user.bio) {
      $state.go('home');
    }

    function login(response) {
      $window.localStorage.user = JSON.stringify(response.data.user);
      $rootScope.user = response.data.user;
      if ($rootScope.user.bio) {
        $state.go('home');
      } else {
        $location.path('register');
      }
    }

    $scope.submit = function(provider) {
      $auth.authenticate(provider)
      .then(login);
    };

  }]);
