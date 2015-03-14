'use strict';

angular.module('dating-app')
  .controller('TopNavCtrl', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state){
    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.clear();
      $state.go('login');
    };
  }]);
