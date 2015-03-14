'use strict';

angular.module('dating-app')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$window', '$state', '$auth', 'User', function($rootScope, $scope, $window, $state, $auth, User){

    $scope.finish = function(user) {
      User.register($rootScope.user._id, user)
      .then(response => {
        $window.localStorage.user = JSON.stringify(response.data.user);
        $rootScope.user = response.data.user;
        console.log(response.data);
        $state.go('login');
      });
    };

  }]);
