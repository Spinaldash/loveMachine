'use strict';

angular.module('dating-app')
  .controller('AccountProfileCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){
    if (!$rootScope.user) {
      $state.go('login');
    }

    User.getUser($rootScope.user._id)
    .then(response => {
      $window.localStorage.user = JSON.stringify(response.data.user);
      $rootScope.user = response.data.user;
    });

    $scope.makeDefault = function(index) {
      User.markPrimary(index)
      .then(response => {
        $window.localStorage.user = JSON.stringify(response.data.user);
        $rootScope.user = response.data.user;
        $state.go('account.profile');
      });
    };

  }]);
