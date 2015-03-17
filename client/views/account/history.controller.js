'use strict';

angular.module('dating-app')
  .controller('AccountHistoryCtrl', ['$rootScope', '$scope', '$window', '$state', 'User', 'Dates', function($rootScope, $scope, $window, $state, User, Dates){

    $scope.proposal1filter = function(proposal) {
      if(proposal.sender._id === $rootScope.user._id) {
        return false;
      }
      return true;
    };

    $scope.incident1filter = function(incident) {
      if(incident.sender._id === $rootScope.user._id) {
        return false;
      }
      return true;
    };

    $scope.declineProposal = function(propId) {
      Dates.decline(propId)
      .then(()=>{
        $state.reload();
      });
    };

    $scope.acceptProposal = function(propId) {
      Dates.agree(propId)
      .then(() => {
        $state.reload();
      });
    };

    User.getPendingProposals()
    .then(response => {
      $scope.pendingProposals = response.data.proposals;
    });

    User.getAcceptedProposals()
    .then(response => {
      $scope.acceptedProposals = response.data.proposals;
    });

    User.getIncidents()
    .then(response => {
      $scope.incidents = response.data.incidents;
      console.log($scope.incidents);
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
