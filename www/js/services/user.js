'use strict';

angular.module('starter.services')
    .factory('UserService', UserService);

UserService.$injector = ['$http', 'CONFIG', '$rootScope', '$log', '$q'];
function UserService($http, CONFIG, $rootScope, $log, $q){

    var service = {

        /**
         * This method will return the user profile data if he is authenticated, null otherwise.
         * @returns {*}
         */
        me: function(){
            return $http.get(CONFIG.route.me)
                .then(function (data) {
                    $log.debug('UserService -> me -> success: ', data.data);
                    return data.data;
                })
                .catch(function (err) {
                    // Case of unauthorized we return null as data
                    // Otherwise just throw back error
                    if(err.status == 401){
                        return null;
                    }
                    throw err;
                });
        }

    };
    return service;

}