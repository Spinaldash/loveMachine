'use strict';

angular.module('dating-app')
  .controller('UsersShowCtrl',
  ['$rootScope', '$scope', '$state', 'User', 'Gift', function($rootScope, $scope, $state, User, Gift) {

    $scope.gifts = null;

    $scope.sendMessage = function(body, userId) {
      let payload = {
        body: body,
        receiverId: userId
      };
      User.message(payload)
      .then(() => {
        $rootScope.message = false;
      });
      if ($scope.showUser.phone) {
        User.sms(payload)
        .then(() => { $state.reload(); });
      }
    };

    User.show($state.params.userId)
    .then(response => {
      $scope.showUser = response.data.user;
    });

    Gift.userGifts($state.params.userId)
    .then(response => {
      $scope.gifts = response.data.gifts;
    });

    $scope.showMessage = function() {
      $rootScope.message = !$rootScope.message;
    };

    $scope.wink = function(userId) {
      User.wink(userId)
      .then(() => {
        $state.go('home');
      });
    };

  }]);
