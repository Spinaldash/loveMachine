'use strict';

angular.module('dating-app')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){

    $scope.newUser ={};
    $scope.newUser.lookingFor = {Male: false, Female: false, Other: false};

    if (!$rootScope.user) {
      $state.go('/');
    }

    User.findAll()
    .then(response => {
      $scope.users = response.data.users;
    });

    $scope.wink = function(userId) {
      User.wink(userId)
      .then(() => {
        $state.go('home');
      });
    };

  }]);
