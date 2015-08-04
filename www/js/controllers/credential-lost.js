(function(){
    'use strict'

    angular.module('starter.controllers')
        .controller('CredentialLostCtrl', CredentialLostCtrl);

    function CredentialLostCtrl($scope, popupService, CONFIG, EVENTS, user, API, authenticationService, UserService) {

        $scope.data = {
            email: 'user@user.com',
        };

        $scope.doForm = function(form){

            if(form.$valid === false){
                popupService.show(popupService.template.BAD_FORM);
            }
            else{

                UserService.resetPassword($scope.data.email)
                    .then(function(err){
                        console.log(err);
                        popupService.show(null, 'Success', 'An email has been send to ' + $scope.data.email + ' with the procedure to retrieve his account');
                    });
                    // no need to check err 400 as we should handle email verification in front side

            }
        }
    }
})();