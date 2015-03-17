'use strict';

angular.module('dating-app')
  .controller('AccountProfileCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', '$location', 'User', function($rootScope, $scope, $window, $state, $auth, $location, User){
    if (!$rootScope.user) {
      $state.go('login');
    }

    User.getUser($rootScope.user._id)
    .then(response => {
      $window.localStorage.user = JSON.stringify(response.data.user);
      $rootScope.user = response.data.user;
    });

    $scope.makePrimary = function(index) {
      console.log(index);
    };

  }]);
