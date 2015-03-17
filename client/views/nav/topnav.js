'use strict';

angular.module('dating-app')
  .controller('TopNavCtrl', ['$rootScope', '$scope', '$window', '$state', 'Nav', function($rootScope, $scope, $window, $state, Nav){
    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.clear();
      $state.go('login');
    };

    $scope.search = function(search){
      Nav.search()
      .then(function(response){
        console.log(response.data.users);
        $state.go('search');
        console.log('the search is', search);
        $rootScope.search = search;
        console.log('response.data.users', response.data.users);
        $rootScope.searchItems = response.data.users;
      });
    };
  }]);
