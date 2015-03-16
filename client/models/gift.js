'use strict';

angular.module('dating-app')
  .factory('Gift', ['$rootScope', '$http', function($rootScope, $http){

    function userGifts(userId) {
      return $http.get(`/users/${userId}/gifts`);
    }

    return {userGifts:userGifts};
  }]);
