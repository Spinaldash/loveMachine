/* jshint loopfunc:true, camelcase:false */

'use strict';

angular.module('dating-app')
  .factory('User', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function findAll() {
      return $http.get('/users');
    }

    function getIncidents() {
      return $http.get('/incidents');
    }

    function getPendingProposals() {
      return $http.get('/proposals/pending');
    }

    function getAcceptedProposals() {
      return $http.get('/proposals/accepted');
    }

    function getUser(userId) {
      return $http.get(`/users/${userId}`);
    }

    function register(userId,user) {
      return $http.post(`/users/${userId}`, user);
    }

    function update(userId, user) {
      return $http.post(`/users/${userId}`, user);
    }

    function wink(userId) {
      return $http.post(`/users/${userId}/wink`);
    }

    function message(body) {
      return $http.post(`/messages/email`, body);
    }

    function upload(userId, photos){
      var count = 0;
      for (var i = 0; i < photos.length; i++){
        var file = photos[i];
        $upload.upload({
          url: '/users/' + userId + '/upload',
          method: 'POST',
          file: file
        }).success(function(){
          count++;
          $rootScope.$broadcast('upload', count);
        }).error(function(){
          console.log('An error has occurred during a file upload');
        });
      }
    }

    function show(userId) {
      return $http.get('/users/' + userId);
    }

    return {findAll:findAll, getUser:getUser, update:update, show:show, register:register, upload:upload, getIncidents:getIncidents, getProposals:getProposals, wink:wink, message:message};

  }]);
