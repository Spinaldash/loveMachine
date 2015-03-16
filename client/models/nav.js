'use strict';

angular.module('dating-app')
  .factory('Nav', ['$rootScope', '$http', function($rootScope, $http){

    function search(input) {
      console.log('made it to the nan.js view model');

      // return $http.get(`/users/${userId}/gifts`);
    }

    return {search:search};
  }]);
