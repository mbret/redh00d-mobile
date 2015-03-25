'use strict';

angular.module('starter.controllers')
    .controller('EventsCtrl', EventsCtrl);

EventsCtrl.$inject = ['$scope', 'Events'];
function EventsCtrl($scope, Events) {
    $scope.events = Events.fetchAll();
}