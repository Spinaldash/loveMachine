/* global StripeCheckout:true */

'use strict';

angular.module('dating-app')
.directive('ppStripeBrain', [() => {
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/pp-stripe-brain.html';
  o.scope = {};
  o.controller = ['$rootScope', '$scope', 'Gift', '$state', ($rootScope, $scope, Gift, $state) => {
    var data;
    var handler = StripeCheckout.configure({
      key:   'pk_test_Juj6ciDALdGVzEBrCt1V05Rq',
      image: '/img/logo.png',
      token: function(token) {
        console.log(token.id);
        var item = {
          token: token.id,
          name: data.gift.name,
          photo: data.gift.photo,
          senderId: data.sender._id,
          receiverId: JSON.parse(data.receiver)._id
        };
        Gift.purchaseGift(data.gift._id, item)
        .then( () => {
          $state.go('gifts.store');
        });
      }
    });

    $scope.$on('purchase', (event, info) => {
      data = info;
      handler.open({
        name:        'Pied Piper',
        description: info.gift.name,
        amount:      info.gift.price * 100
      });
    });
  }];

  return o;
}]);
