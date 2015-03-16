'use strict';

angular.module('dating-app')
  .controller('GiftsStoreCtrl', ['$rootScope', '$scope', '$window', '$state', 'Gift', 'User', function($rootScope, $scope, $window, $state, Gift, User){

    User.findAll()
    .then(response => {
      $scope.users = response.data.users;
      console.log($scope.users);
    });

    Gift.getItems()
    .then(response => {
      $scope.gifts = response.data.items;
    });

  }]);
