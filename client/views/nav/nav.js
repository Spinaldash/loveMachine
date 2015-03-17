'use strict';

angular.module('dating-app')
  .controller('NavCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){

    console.log('rootscope.user:', $rootScope.user._id);

    User.getIncidents($rootScope.user._id)
    .then(response => {
      console.log('hello world');
      console.log("response", response);
      $scope.incidentNum = response.data.messages;
      console.log($scope.messages);
    });

    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.clear();
      $state.go('login');
    };

  }]);
