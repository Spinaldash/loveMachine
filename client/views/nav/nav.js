'use strict';

angular.module('dating-app')
  .controller('NavCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){
    // console.log('rootscope.user:', $rootScope.user._id);
    User.getIncidents()
    .then(response => {
      var incidents = response.data.incidents;
      $scope.incidentNum = incidents.length;
    });

  }]);
