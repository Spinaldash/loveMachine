'use strict';

angular.module('dating-app')
  .controller('TopNavCtrl', ['$rootScope', '$scope', '$window', '$state', 'Nav', function($rootScope, $scope, $window, $state, Nav){
    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.clear();
      $state.go('login');
    };

    $scope.search = function(input){
      console.log('the search bar was clicked and the topnav.js controller was called!');
      Nav.search()
      .then(function(response){
        console.log(response);
      })
    };
  }]);
