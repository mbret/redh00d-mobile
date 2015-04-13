'use strict';

angular.module('starter.services')
    .factory('popupService', popupService);

popupService.$injector = ['popupService'];

/**
 * This service is a wrapper of popup. Use it instead of $ionicPopup or other as it may centralize the app logic
 * in one place and use the same way for all the app. Useful example:
 *  - using several libraries can be wrapped here
 *  - add condition relative to platform
 *  - etc
 *
 * @param $ionicPopup
 * @returns {{error: Function, badCredentials: Function, loggedOut: Function}}
 */
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