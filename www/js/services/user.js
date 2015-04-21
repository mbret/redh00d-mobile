'use strict';

angular.module('starter.services')
    .factory('UserService', UserService);

UserService.$injector = ['$http', 'CONFIG', '$rootScope', '$log', '$q', '$localStorage'];
function UserService($http, CONFIG, $rootScope, $log, $q, $localStorage){

    var service = {

        /**
         * Try to retrieve user data based on local stored information.
         * If it's not possible to retrieve user data it means that the user need
         * to be authenticated or logged first.
         *
         * @tips You can use this method whenever you want to check if user is logged.
         *
         * @returns promise with user data or null
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
        },

        cleanLocalTraces: function(){
            $localStorage.delete('access_token');
            $log.debug('UserService.cleanLocalTraces -> user traces deleted');
        }

    };
    return service;

}