'use strict';

angular.module('starter.controllers')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, $timeout, user, $state) {
    
    // dev bypass
    if(user.authenticated === true){
        $state.go('app.events');
    }

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            user.authenticated = true;
            $state.go('app.events');
        }, 1000);
    };
    
}