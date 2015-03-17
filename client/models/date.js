'use strict';

angular.module('dating-app')
  .factory('Dates', ['$http', function($http){

    function propose(userId, date) {
      return $http.post(`/users/${userId}/propose`, date);
    }

    function agree(propId) {
      return $http.post(`/proposals/${propId}/accept`);
    }

    function decline(propId) {
      return $http.post(`/proposals/${propId}/decline`);
    }

    return {propose:propose, agree:agree, decline:decline};
  }]);
