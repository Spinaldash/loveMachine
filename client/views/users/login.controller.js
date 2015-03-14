'use strict';

angular.module('dating-app')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', '$location', function($rootScope, $scope, $window, $state, $auth, $location){
    if ($rootScope.user) {
      $state.go('home');
    }

    function login(response) {
      console.log(response.data.user);
      $window.localStorage.user = JSON.stringify(response.data.user);
      $rootScope.user = response.data.user;
      if ($rootScope.user.bio) {
        console.log('Home', $rootScope.user);
        $state.go('home');
      } else {
        console.log('Register', $rootScope.user);
        $location.path('register');
      }
    }

    $scope.submit = function(provider) {
      $auth.authenticate(provider)
      .then(login);
    };

  }]);
