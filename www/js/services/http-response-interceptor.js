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
function httpResponseInterceptor($q, $rootScope, $injector, MESSAGES, EVENTS){
    return {
        
        response: function(response) {
            $rootScope.$broadcast(EVENTS.HIDE_LOADING); // less coupling with plugins
            return response
        },
        
        responseError: function(rejection) {

            $rootScope.$broadcast(EVENTS.HIDE_LOADING); // less coupling with plugins
            
            // Problem with server
            if(rejection.status == 0){
                //$injector.get("$ionicPopup").alert({
                //    title: 'Error!',
                //    template: 'We are having issue to contact server!'
                //});
                var a = $injector.get('$cordovaToast').showLongBottom(MESSAGES.SERVER_ACCESS_ERROR);
                console.log(a);
            }

            return $q.reject(rejection);
        }
    }
}