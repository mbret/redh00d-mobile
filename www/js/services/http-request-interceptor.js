'use strict';

angular.module('starter.services')
    .factory('httpRequestInterceptor', httpRequestInterceptor);

httpRequestInterceptor.$injector = ['$q','$log', 'CONFIG', '$localStorage'];
/**
 * * 
 * @param $q
 * @param $log
 * @param CONFIG
 * @param $localStorage
 * @returns {{request: Function}}
 */
function httpRequestInterceptor($q,$log, CONFIG, $localStorage){
    return {
        request: function (config) {

            // log only api requests
            if ( config.url.indexOf(CONFIG.apiUrl) === 0 ) $log.debug('httpRequestInterceptor -> request -> request made at /' + config.method + ' ' + config.url);
            
            config.headers = config.headers || {};
            
            // pass access_token to each request (only for api request)
            if ( config.url.indexOf(CONFIG.apiUrl) === 0 && $localStorage.has('access_token')) {
                $log.debug('httpRequestInterceptor -> request -> access_token injected : ' + $localStorage.get('access_token').substring(0, 30) + '****');
                config.headers.Authorization = 'Bearer ' + $localStorage.get('access_token');
            }
            
            return config;
        }
    }
}