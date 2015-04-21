'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);


function EventsCtrl($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}



