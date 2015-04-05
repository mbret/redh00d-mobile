'use strict';

angular.module('starter.services')
    .factory('httpResponseInterceptor', httpResponseInterceptor);

httpResponseInterceptor.$injector = ['$q','$location', '$injector'];
/**
 * http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
 * @param $q
 * @param $location
 * @returns {{response: Function}}
 */
function httpResponseInterceptor($q,$location,$injector){
    return {
        responseError: function(rejection) {
            
            // Problem with server
            if(rejection.status == 0){
                $injector.get("$ionicPopup").alert({
                    title: 'Error!',
                    template: 'We are having issue to contact server!'
                });
            }

            return $q.reject(rejection);
        }
    }
}