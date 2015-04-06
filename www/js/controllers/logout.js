'use strict';

angular.module('starter.controllers')
    .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($scope, popupService, CONFIG, user, $state, AuthenticationService, $ionicPopup) {

    AuthenticationService.logout()
        .then(function(){
            popupService.loggedOut();
            $state.go(CONFIG.state.login);
        });
    
}