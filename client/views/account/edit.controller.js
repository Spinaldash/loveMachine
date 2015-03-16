'use strict';

angular.module('dating-app')
  .controller('AccountEditCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){
    if (!$rootScope.user) {
      $state.go('login');
    }

    $scope.submit = function(user) {
      User.update(user._id, user)
      .then(response => {
        $window.localStorage.user = JSON.stringify(response.data.user);
        $rootScope.user = response.data.user;
        $state.go('account.profile');
      });
    };

  }]);
