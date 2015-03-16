'use strict';

angular.module('dating-app')
  .controller('GiftsStoreCtrl', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state){
    $scope.gifts = [
      {name: 'rose', cost: 0.99, sender: null, receiever: null},
      {name: 'box of chocolates', cost: 0.99, sender: null, receiever: null},
      {name: 'heart', cost: 0.99, sender: null, receiever: null}
    ]
  }]);
