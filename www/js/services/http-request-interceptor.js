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
function httpRequestInterceptor($rootScope, $log, CONFIG, $localStorage, EVENTS, $timeout, $injector){

    var $state;
    $timeout(function () {
        $state = $injector.get('$state');
    });
    
    return {
        request: function (config) {

            // log only api requests
            if ( isApiRequest(config) ) $log.debug('httpRequestInterceptor:request: /' + config.method + ' ' + config.url);
            
            config.headers = config.headers || {};

            // pass access_token to each request (only for api request)
            if ( isApiRequest(config) && $localStorage.has('access_token')) {
                $log.info('httpRequestInterceptor:request: Request made to api, access token detected and injected in header. ' + $localStorage.get('access_token').substring(0, 30) + '****');
                config.headers.Authorization = 'JWT ' + $localStorage.get('access_token');
            }

            if(isHttpRequest(config)){
                $rootScope.$broadcast(EVENTS.REQUEST_SENT, config.url);
            }

            return config;
        }
    }
    
    function isApiRequest(config){
        return config.url.indexOf(CONFIG.apiUrl) === 0 ? true : false;
    }
    
    function isHttpRequest(config){
        return config.url.indexOf('http') === 0 ? true : false;
    }
}