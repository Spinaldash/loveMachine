'use strict';

angular.module('dating-app')
  .controller('NavCtrl', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state){
    $scope.logout = function(){
      delete $rootScope.email;
      $window.localStorage.clear();
      $state.go('login');
    };
  }]);
