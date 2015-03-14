'use strict';

angular.module('dating-app')
  .factory('User', ['$http', function($http){

    $scope.register = function(user) {
      return $http.post(`/users/${user._id}`, user);
    }

    return {};
  }]);
