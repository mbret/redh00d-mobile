'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);

EventsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
function EventsCtrl($scope, Events, $ionicLoading) {
    
    $scope.events = Events.fetchAll();


}