'use strict';

angular.module('starter.controllers')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, $timeout, user, $state, $ionicLoading, $ionicPopup, AuthenticationService) {

    $scope.data = {};

    // dev bypass
    if(user.authenticated === true){
        $state.go('app.events');
    }

    // Perform the login action when the user submits the login form
    $scope.doLogin = function(provider) {

        if(provider){
            $ionicPopup.alert({
                title: 'Error!',
                template: 'The provider authentication method is not supported yet! Zblaa'
            })
        }
        else{
            AuthenticationService.login($scope.data.username, $scope.data.password)
                .then(function(){
                    $ionicLoading.show({
                        template: 'Logging in...'
                    });

                    // Simulate a login delay. Remove this and replace with your login
                    // code if using a login system
                    $timeout(function() {
                        user.authenticated = true;
                        $state.go('app.events');
                        $ionicLoading.hide();
                    }, 1000);
                })
                .catch(function(err){

                });
        }

    };
    
}