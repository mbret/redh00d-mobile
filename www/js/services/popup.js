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
                title: 'Incorrect password',
                template: 'The password you entered is incorrect. Please try again.'
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