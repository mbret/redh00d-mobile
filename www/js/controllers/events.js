'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', ContentController);


function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}



