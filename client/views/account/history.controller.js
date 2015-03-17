'use strict';

angular.module('dating-app')
  .controller('AccountHistoryCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', function($rootScope, $scope, $window, $state, User){

    $scope.proposal1filter = function(proposal) {
      if(proposal.sender._id === $rootScope.user._id) {
        return false;
      }
      return true;
    }

    User.getProposals()
    .then(response => {
      $scope.proposals = response.data.proposals;
    });
  }]);

  //
  // $scope.item1filter = function(trade) {
  //       if(trade.user1._id === $rootScope.userId && !trade.isCompleted) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };
