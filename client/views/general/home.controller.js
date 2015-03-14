'use strict';

angular.module('dating-app')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
    if (!$rootScope.user) {
      $state.go('/');
    }
  }]);
