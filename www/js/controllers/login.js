'use strict';

angular.module('starter.controllers')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$injector = ['$scope', '$rootScope', '$timeout', 'user', '$state', '$ionicLoading', '$ionicPopup', 'AuthenticationService', 'CONFIG'];
function LoginCtrl($scope, $rootScope, $timeout, user, $state, $ionicLoading, $ionicPopup, AuthenticationService, CONFIG) {

    $scope.data = {
        email: 'user@user.com',
        password: 'password'
    };

    // dev bypass
    if(user.authenticated === true){
        $state.go(CONFIG.state.home);
    }

    /**
     *  
     */
    $scope.doRegister = function(){
        $ionicPopup.alert({
            title: 'Error!',
            template: 'Not yet supported'
        });
    };

    /**
     * Perform the login action when the user submits the login form
     * @param provider
     */
    $scope.doLogin = function(provider) {
        console.log(provider);
        if(provider){
            $ionicPopup.alert({
                title: 'Error!',
                template: 'Not yet supported'
            });
        }
        else{
            console.log('sdf');
            $ionicLoading.show({
                template: 'Logging in...'
            });
            
            AuthenticationService.login($scope.data.email, $scope.data.password)
                .then(function(){
                    user.authenticated = true;
                    $state.go(CONFIG.state.home);
                    $ionicLoading.hide();
                })
                .catch(function(err){
                    // Bad request
                    if(err && err.status && err.status == 400){
                        $ionicPopup.alert({
                            title: 'Auth error',
                            template: 'Bad credentials'
                        })
                    }
                });
        }

    };
    
}