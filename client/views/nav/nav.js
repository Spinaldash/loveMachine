'use strict';

angular.module('dating-app')
  .controller('NavCtrl', ['$rootScope', '$scope', 'User', function($rootScope, $scope, User){
    $scope.logout = function(){
      User.logout().then(function(){
        delete $rootScope.email;
      });
    };
  }]);
