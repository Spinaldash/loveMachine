'use strict';

angular.module('dating-app')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', function($rootScope, $scope, $window, $state, $auth){

    $scope.finish = function(user) {
      console.log(user);
    }

  }]);
