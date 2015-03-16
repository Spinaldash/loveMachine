'use strict';

angular.module('dating-app')
  .controller('GiftsStoreCtrl', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state){
    $scope.gifts = [
      {name: "heart", cost: 0.99, photo:'/media/images/icons/giveHeart.png', sender: null, receiever: null},
      {name: 'peach', cost: 0.99, photo:'media/images/store/peach.png', sender: null, receiever: null},
      {name: 'beer', cost: 0.99, photo:'media/images/store/beer.png', sender: null, receiever: null}
    ]

    
  }]);
