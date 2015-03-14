'use strict';

angular.module('dating-app')
  .factory('User', ['$http', function($http){

    function register(userId,user) {
      return $http.post(`/users/${userId}`, user);
    }

    return {register:register};
  }]);
