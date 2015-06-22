'use strict';

angular.module('starter.services')
    .factory('toastService', toastService);

toastService.$injector = ['$cordovaToast', '$log', 'CONFIG'];


function toastService($cordovaToast, $log, CONFIG){

    return {

        template: {
            BAD_CREDENTIAL: 0,
            BAD_FORM: 1
        },

        showLongBottom: function(message, template){
            return this._show(message, template, $cordovaToast.showLongBottom);
        },
        
        showShortBottom: function(message, template){
            return this._show(message, template, $cordovaToast.showShortBottom);
        },

        _show: function(message, template, fn){
            if(template){
                switch(template){
                    case this.template.BAD_FORM:
                        message = "Form invalid, please review your input";
                        break;
                }
            }
            
            if(!CONFIG.allowCordorva){
                $log.warn('toastService -> ' + message + ' [cordova deactivated]');
                return;
            }

            return fn(message);
        }
    };
    
}