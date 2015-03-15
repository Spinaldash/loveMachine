'use strict';

angular.module('dating-app')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', 'User', function($rootScope, $scope, $window, $state, $auth, User){

    $scope.colors ={Green: true, Orange: false};
    $scope.newUser ={};
    $scope.newUser.lookingFor = {Male: false, Female: false, Other: false};


    $scope.finish = function(user) {
      User.register($rootScope.user._id, user)
      .then(response => {
        $window.localStorage.user = JSON.stringify(response.data.user);
        $rootScope.user = response.data.user;
        $state.go('login');
      });
    };

  }]);
