'use strict';

angular.module('dating-app')
  .controller('NavCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){

    console.log('rootscope.user:', $rootScope.user._id);

    User.getIncidents()
    .then(response => {
      console.log('hello world');
      console.log("response", response);
      var incidents = response.data.incidents;
      $scope.incidentNum = incidents.length;
      console.log($incidentNum);
    });

    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.clear();
      $state.go('login');
    };

  }]);
