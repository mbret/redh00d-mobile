'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);

EventsCtrl.$inject = ['$scope', 'Events', '$ionicLoading', '$ionicHistory', '$ionicNavBarDelegate'];
function EventsCtrl($scope, Events, $ionicLoading, $ionicHistory, $ionicNavBarDelegate) {
    
    $scope.events = Events.fetchAll();

    // On event view we clear navigation history and hide back button
    // This is the home behaviour
    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);
    
}