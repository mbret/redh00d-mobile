'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);


function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}



