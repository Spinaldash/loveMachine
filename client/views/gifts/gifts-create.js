'use strict';

angular.module('dating-app')
  .controller('GiftsCreateCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', 'Gift', function($rootScope, $scope, $window, $state, $auth, Gift){


    $scope.create = function(gift) {
      Gift.create(gift);
      $state.go('gifts.store');
    };

  }]);
