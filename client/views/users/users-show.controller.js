'use strict';

angular.module('dating-app')
  .controller('UsersShowCtrl',
  ['$rootScope', '$scope', '$state', 'User', 'Gift', function($rootScope, $scope, $state, User, Gift) {

    $scope.gifts = null;

    User.show($state.params.userId)
    .then(response => {
      $scope.showUser = response.data.user;
    });

    Gift.userGifts($state.params.userId)
    .then(response => {
      $scope.gifts = response.data.gifts;
    });

    $scope.wink = function(userId) {
      User.wink(userId)
      .then(() => {
        $state.go('home');
      });
    };

  }]);
