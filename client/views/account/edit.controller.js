'use strict';

angular.module('dating-app')
  .controller('AccountEditCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', '$location', function($rootScope, $scope, $window, $state, $auth, $location){
    if (!$rootScope.user) {
      $state.go('login');
    }

  }]);
