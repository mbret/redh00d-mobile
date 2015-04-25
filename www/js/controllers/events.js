'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);

EventsCtrl.$inject = ['$scope', 'Events', '$ionicLoading', '$ionicHistory', '$ionicNavBarDelegate', 'UserService'];
function EventsCtrl($scope, Events, $ionicLoading, $ionicHistory, $ionicNavBarDelegate, UserService) {
    
    $scope.events = Events.fetchAll();
    
    setTimeout(function(){
        var currentAuth = UserService.me();
    }, 5000);


}