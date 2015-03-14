'use strict';

angular.module('dating-app')
  .factory('User', ['$http', function($http){

    function register(user) {
      console.log('User', user);
      // return $http.post(`/users/${user._id}`, user);
    }

    return {register:register};
  }]);
