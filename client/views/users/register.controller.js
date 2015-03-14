'use strict';

angular.module('dating-app')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', 'User', function($rootScope, $scope, $window, $state, $auth, User){

    $scope.finish = function(user) {
      User.register(user)
      .then(response => {
        $state.go('login');
      });
    };

  }]);
