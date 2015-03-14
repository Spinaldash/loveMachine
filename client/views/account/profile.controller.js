'use strict';

angular.module('dating-app')
  .controller('AccountProfileCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', '$location', function($rootScope, $scope, $window, $state, $auth, $location){
    if (!$rootScope.user) {
      $state.go('login');
    }

  }]);
