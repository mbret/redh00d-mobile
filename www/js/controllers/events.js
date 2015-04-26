'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);

EventsCtrl.$inject = ['$scope', 'Events', '$ionicLoading', '$ionicHistory', '$ionicSideMenuDelegate', 'UserService'];
function EventsCtrl($scope, Events, $ionicLoading, $ionicHistory, $ionicSideMenuDelegate, UserService) {
    
    $scope.events = Events.fetchAll();
    
    // In 5 second controller will request user profile
    // If user is not connected it will redirect to login automatically
    setTimeout(function(){
        var currentAuth = UserService.me();
    }, 5000);


    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
}