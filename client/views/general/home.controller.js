'use strict';

angular.module('dating-app')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
    if (!$rootScope.user) {
      $state.go('/');
    }

    User.findAll()
    .then(response => {
      $scope.users = response.data.users;
    });

  }]);
