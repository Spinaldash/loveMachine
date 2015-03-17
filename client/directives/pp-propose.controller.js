'use strict';

angular.module('dating-app')
  .directive('ppPropose', [() => {
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/directives/pp-propose.html';
    o.scope = {};
    o.link = function() {};
    o.controller = ['$rootScope', '$scope', '$state', 'Dates', ($rootScope, $scope, $state, Dates) => {
      $scope.propose = function(date) {
        Dates.propose($state.params.userId, date)
        .then(() => {
          $state.go('home');
        });
      };
    }];

    return o;
  }]);
