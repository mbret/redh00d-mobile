'use strict';

angular.module('starter.services')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$injector = ['$http', 'CONFIG', '$q', '$log', '$localStorage', 'UserService', '$rootScope', 'EVENTS'];
function AuthenticationService($http, CONFIG, $q, $log, $localStorage, UserService, $rootScope, EVENTS){

    var service = {

        /**
         * Log in a user according to the given email / password.
         *
         * @param email
         * @param password
         * @returns {*} The user data or error with status code.
         */
        login: function(email, password) {
            return $http.post(CONFIG.route.login, { email: email, password: password })
                .then(function (data) {
                    $log.debug('authentication success -> access_token : ' + data.data.token);
                    
                    // save access token for futur request
                    $localStorage.set('access_token', data.data.token);

                    // Load account information, now this method should work.
                    // will return data or null
                    return UserService.me().then(function(data){
                        // We have an unexpected error here, the user should be logged!
                        if(!data){
                            $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                            return $q.reject();
                        }
                        return data;
                    })
                })
                .catch(function (err) {
                    $log.debug('AuthenticationService -> login -> login failed');
                    return $q.reject(err);
                });
        },

        logout: function(user) {
            $localStorage.delete('access_token');
            $log.debug('authentication -> logout');

            return $q.when();
            //$http.post('https://logout', {}, { ignoreAuthModule: true })
            //    .finally(function(data) {
            //        delete $http.defaults.headers.common.Authorization;
            //        $rootScope.$broadcast('event:auth-logout-complete');
            //    });
        },

        loginCancelled: function() {
            authService.loginCancelled();
        }
    };
    return service;

}