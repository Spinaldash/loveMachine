'use strict';

angular.module('dating-app')
  .controller('UsersCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', function($rootScope, $scope, $window, $state, $auth){

    function login(response) {
      $window.localStorage.user = JSON.stringify(response.data.user);
      $rootScope.user = response.data.user;
      $state.go('home');
    }

    $scope.submit = function(provider) {
      $auth.authenticate(provider)
      .then(login);
    };

  }]);
