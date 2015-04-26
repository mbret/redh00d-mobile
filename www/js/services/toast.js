'use strict';

angular.module('starter.services')
    .factory('ToastService', ToastService);

ToastService.$injector = ['$cordovaToast', '$log', 'CONFIG'];


function ToastService($cordovaToast, $log, CONFIG){

    return {

        showLongBottom: function(message){
            if(!CONFIG.allowCordorva){
                $log.info('ToastService -> showLongBottom -> $cordovaToast unavailable with WebView -> MESSAGE: ' + message);
                return;
            }
            return $cordovaToast.showLongBottom(message);
        }

    };
    
}