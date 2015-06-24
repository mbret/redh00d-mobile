'use strict';

angular.module('starter.controllers')
    .controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($scope, CONFIG, $state, user, MAPPERS, API, popupService, toastService, authenticationService) {

    $scope.data = {
        email: 'user@user.com',
        password: 'password'
    };

    /**
     * Perform a registration
     */
    $scope.doRegister = function(form){

        if(form.$valid === false){
            toastService.showShortBottom(null, toastService.template.BAD_FORM);
        }
        else{
            // register online et get user data
            authenticationService.register($scope.data.email, $scope.data.password)
                .then(function(data){
                    popupService.show(popupService.template.REGISTERED);
                    $state.go(CONFIG.state.home);
                })
                .catch(function(err){
                    // Bad request
                    if(err && err.status && err.status === 400){
                        // email taken
                        if(err.data && err.data.code === API.ERROR_CODE.E_EMAIL_ALREADY_TAKEN){
                            popupService.show(popupService.template.EMAIL_ALREADY_TAKEN);
                        }
                        else{
                            popupService.show(popupService.template.BAD_FORM);
                        }
                    }
                });
        }

    };
    
}