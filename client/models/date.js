'use strict';

angular.module('dating-app')
  .factory('Dates', ['$http', function($http){

    function propose(userId, date) {
      return $http.post(`/users/${userId}/propose`, date);
    }

    return {propose:propose};
  }]);
