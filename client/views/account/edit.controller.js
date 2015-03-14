'use strict';

angular.module('dating-app')
  .controller('AccountEditCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
    if (!$rootScope.user) {
      $state.go('login');
    }

    $scope.uploadPictures = function(photos) {
      User.upload($rootScope.user._id, photos);
    };

    $scope.$on('upload', function(e, count){
      $scope.count = count;
      if($scope.count === $scope.photos.length){
        $state.go('account.profile');
      }
    });

  }]);
