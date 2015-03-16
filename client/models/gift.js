'use strict';

angular.module('dating-app')
  .factory('Gift', ['$rootScope', '$http', function($rootScope, $http){

    function userGifts(userId) {
      return $http.get(`/users/${userId}/gifts`);
    }

    function getItems() {
      return $http.get(`/items`);
    }

    function purchaseGift(giftId, item) {
      return $http.post(`/items/${giftId}/purchase`, item);
    }

    return {userGifts:userGifts, getItems:getItems, purchaseGift:purchaseGift};
  }]);
