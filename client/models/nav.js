'use strict';

angular.module('dating-app')
  .factory('Nav', ['$rootScope', '$http', function($rootScope, $http){

    function search() {
      return $http.get('/users');
    }

    return {search:search};
  }]);
