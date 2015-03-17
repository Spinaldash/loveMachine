'use strict';

angular.module('dating-app')
  .controller('AccountHistoryCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){

    console.log('RUNNING PRE PROPOSAL RESPONSE');
    User.getProposals()
    .then(response => {
      console.log('RUNNING GETT PROPOSAL RESPONSE');
      $scope.proposals = response.data.proposals;
    });
  }]);
