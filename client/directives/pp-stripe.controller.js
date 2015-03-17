'use strict';

angular.module('dating-app')
  .directive('ppStripe', [() => {
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/directives/pp-stripe.html';
    o.scope = {
      gift: '=',
      receiver: '='
    };
    o.link = function() {};
    o.controller = ['$rootScope', '$scope', ($rootScope, $scope) => {
      $scope.purchase = function() {
        var info = {
          gift: $scope.gift,
          receiver: $scope.receiver,
          sender: $rootScope.user
        };
        $rootScope.$broadcast('purchase', info);
      };
    }];

    return o;
  }]);
