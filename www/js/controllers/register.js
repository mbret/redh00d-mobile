'use strict';

angular.module('starter.controllers')
    .controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($scope, $rootScope, $timeout, user, $state, $ionicLoading, $ionicPopup, AuthenticationService) {

    console.log('register');
    
    $scope.data = {};

    /**
     * Perform a registration
     */
    $scope.doRegister = function(){
        AuthenticationService.register($scope.data.email, $scope.data.password)
            .then(function(data){
                console.log('HOURRA');

            })
            .catch(function(err){
                // Bad request
                if(err && err.status && err.status === 400){
                    popupService.badCredentials();
                }

            });
    };
    
}