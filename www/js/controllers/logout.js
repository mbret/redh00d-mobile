'use strict';

angular.module('starter.controllers')
    .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($scope, popupService, CONFIG, user, $state, authenticationService, $ionicPopup) {

    authenticationService.logout();
    
}