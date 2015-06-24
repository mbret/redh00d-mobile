'use strict';

angular.module('starter.services')
    .factory('httpResponseInterceptor', httpResponseInterceptor);

httpResponseInterceptor.$injector = ['$q','$location', '$injector', 'MESSAGES'];
/**
 * http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
 * @param $q
 * @param $location
 * @returns {{response: Function}}
 */
function httpResponseInterceptor($q, $injector, MESSAGES, EVENTS, CONFIG, $log, $timeout){

    var $rootScope;
    $timeout(function () {
        $rootScope = $injector.get('$rootScope');
    });
    
    return {
        
        response: function(response) {

            if(isHttpRequest(response.config)){
                $rootScope.$broadcast(EVENTS.RESPONSE_RECEIVED);
            }
            
            return response
        },
        
        responseError: function(rejection) {

            if(isHttpRequest(rejection.config)){
                $rootScope.$broadcast(EVENTS.RESPONSE_RECEIVED);
            }
            
            console.log(rejection);
            
            // Problem with server (unreachable)
            if(rejection.status == 0){
                $rootScope.$broadcast(EVENTS.SERVER_ACCESS_ERROR);
            }

            if(rejection.status === 500){
                $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
            }

            // Intercept unauthenticated response. We need to redirect to login because it's not normal to be unauthenticated
            if(rejection.status === 401){
                $rootScope.$broadcast(EVENTS.SERVER_UNAUTHENTICATED_ERROR);
            }
            
            return $q.reject(rejection);
        }
    };

    function isApiRequest(config){
        return config.url.indexOf(CONFIG.apiUrl) === 0 ? true : false;
    }

    function isHttpRequest(config){
        return config.url.indexOf('http') === 0 ? true : false;
    }
    
}