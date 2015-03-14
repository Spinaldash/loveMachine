'use strict';

angular.module('dating-app')
  .factory('User', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function register(userId,user) {
      return $http.post(`/users/${userId}`, user);
    }

    function upload(userId, photos){
      var count = 0;
      for (var i = 0; i < photos.length; i++){
        var file = photos[i];
        $upload.upload({
          url: '/users/' + userId + '/upload',
          method: 'POST',
          file: file
        }).success(function(data, status, headers, config){
          count++;
          $rootScope.$broadcast('upload', count);
        }).error(function(){
          console.log('An error has occurred during a file upload');
        });
      }
    }

    return {register:register, upload:upload};
  }]);
