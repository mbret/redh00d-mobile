'use strict';

angular.module('starter.services')
    .factory('popupService', popupService);

popupService.$injector = ['popupService'];
function popupService($ionicPopup){

    return {

        error: function(message){
            $ionicPopup.alert({
                title: 'Error',
                template: message
            });
        },
        
        badCredentials: function(){
            $ionicPopup.alert({
                title: 'Error',
                template: 'Invalid crendentials!'
            });
        },
        
        loggedOut: function(){
            $ionicPopup.alert({
                title: 'Logged out!',
                template: 'You have been correctly logged out'
            })
        }

    };
    
}