'use strict';

angular.module('starter.services')
    .factory('popupService', popupService);

popupService.$injector = ['$ionicPopup'];

/**
 * This service is a wrapper of popup. Use it instead of $ionicPopup or other as it may centralize the app logic
 * in one place and use the same way for all the app. Useful example:
 *  - using several libraries can be wrapped here
 *  - add condition relative to platform
 *  - etc
 *
 * @param $ionicPopup
 * @returns object
 */
function popupService($ionicPopup){

    return {

        template: {
            BAD_CREDENTIAL: 0,
            BAD_FORM: 1,
            EMAIL_ALREADY_TAKEN: 2,
            REGISTERED: 3,
            LOGGED_OUT: 4
        },

        /**
         *
         * @param template optional
         * @param title
         * @param message
         * @returns {*}
         */
        show: function(template, title, message){
            return this._show(title, message, template, $ionicPopup.alert);
        },
        
        error: function(message){
            $ionicPopup.alert({
                title: 'Error',
                template: message
            });
        },
        
        loggedOut: function(){
            $ionicPopup.alert({
                title: 'Logged out!',
                template: 'You have been correctly logged out'
            })
        },

        _show: function(title, message, template, fn){
            var title = !title ? '' : title;
            var message = !message ? '' : message;

            switch(template){
                case this.template.BAD_CREDENTIAL:
                    if(title === '') title = 'Incorrect credentials';
                    if(message === '') message = "The credentials you entered are incorrect. Please try again.";
                    break;
                case this.template.BAD_FORM:
                    if(title === '') title = 'Form invalid';
                    if(message === '') message = "Form invalid";
                    break;
                case this.template.EMAIL_ALREADY_TAKEN:
                    if(title === '') title = 'Email taken';
                    if(message === '') message = "This email is already taken";
                    break;
                case this.template.REGISTERED:
                    if(title === '') title = 'Hell YEAH !';
                    if(message === '') message = "You are now registered, enjoy this crazy app :)";
                    break;
                case this.template.LOGGED_OUT:
                    if(title === '') title = 'Logged out';
                    if(message === '') message = "You have been logged out";
                    break;
            }
            
            return fn({ title: title, template: message });
        }

    };
    
}