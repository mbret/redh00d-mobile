'use strict';

angular.module('starter.controllers')
    .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($scope, $rootScope, CONFIG, EVENTS, user, $log, authenticationService, $localStorage) {
    console.log('salut');
    $localStorage.delete('user');
    authenticationService.logout();
    console.log('salut');
    $rootScope.$broadcast(EVENTS.USER_LOGGED_OUT);
    
}