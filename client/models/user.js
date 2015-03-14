'use strict';

angular.module('dating-app')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    return {register:register, login:login};
  }]);
