'use strict';

angular.module('dating-app')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){

    $scope.filterUser = {};
    $scope.filterUser.age = $scope.user.age
    $scope.filterUser.location = $scope.user.location;
    $scope.newUser ={};
    $scope.newUser.lookingFor = {Male: false, Female: false, Other: false};

    if (!$rootScope.user) {
      $state.go('/');
    }


    User.findAll()
    .then(response => {
      $scope.users = response.data.users;
    });

    $scope.ageFilter = function(user) {
      return user.age <= $scope.filterUser.age;
    }

  }]);
