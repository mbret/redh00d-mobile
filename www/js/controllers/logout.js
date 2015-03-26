'use strict';

angular.module('starter.controllers')
    .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($scope, $rootScope, $timeout, user, $state, $ionicLoading, $ionicPopup) {
    
    user.authenticated = false;

    $ionicPopup.alert({
        title: 'Logged out!',
        template: 'You have been correctly logged out'
    })
    .then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
    });

    $state.go('login');
    
}