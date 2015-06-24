'use strict';

angular.module('starter.services')
    .factory('UserService', UserService);

UserService.$injector = ['$http', 'CONFIG', '$rootScope', '$log', '$q', 'API'];
function UserService($http, CONFIG, $rootScope, $log, $q, API){

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

        /**
         * This method call the api to reset a password.
         *
         * If everything is ok the api will return 200.
         * If these cases happens:
         *  - email doesn't exist
         *  - user is not using local auth (no password)
         * the api will return 400 with specific code. We do not fail in these conditions because
         * user doesn't need to know that.
         *
         * @param {string} email User email to reset password
         */
        resetPassword: function(email){
            return $http.post(CONFIG.route.resetPassword.replace(':email', email))
                .then(function () {
                    return;
                })
                .catch(function (err) {

                    if(err){
                        // Case of the user exist but he is not using password access
                        // We do not throw error back as it's handled code
                        if(err.status === 400 && err.data && err.data.code === API.ERROR_CODE.E_PASSWORD_RESET_NO_PASSWORD_SET_YET){
                            $log.info('UserService:resetPassword the reset password request has been made to an account that does not use password yet');
                            return;
                        }
                        // Case email doesn't exist, user should not know that so return ok
                        // It could also be bad
                        else if(err.status === 400 && err.data && err.data.code === API.ERROR_CODE.E_EMAIL_DOES_NOT_BELONG_TO_SOMEONE){
                            $log.info('UserService:resetPassword email does not belong to a valid user');
                            return;
                        }
                    }

                    throw err;
                });
        }

    };
    return service;

}