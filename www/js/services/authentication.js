'use strict';

angular.module('starter.services')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$injector = ['$http', 'CONFIG', '$q', '$log', '$localStorage', 'UserService', '$rootScope', 'EVENTS', 'MAPPERS'];
function AuthenticationService($http, CONFIG, $q, $log, $localStorage, UserService, $rootScope, EVENTS, MAPPERS){

    return {
        register: register,
        login: login,
        logout: logout
    };

    function logout(user) {
        UserService.cleanLocalTraces();
        $log.debug('authentication -> logout');

        return $q.when();
        //$http.post('https://logout', {}, { ignoreAuthModule: true })
        //    .finally(function(data) {
        //        delete $http.defaults.headers.common.Authorization;
        //        $rootScope.$broadcast('event:auth-logout-complete');
        //    });
    }

    /**
     * Log in a user according to the given email / password.
     *
     * @param email
     * @param password
     * @returns {*} The user data or error with status code.
     */
    function login(email, password) {
        return $http.post(CONFIG.route.login, { email: email, password: password })
            .then(function (data) {
                $log.debug('authentication success -> access_token : ' + data.data.token);

                // save access token for futur request
                $localStorage.set('access_token', data.data[MAPPERS.RESPONSE_ACCESS_TOKEN]);

                // Load account information, now this method should work.
                // will return data or null
                return UserService.me().then(function(data){
                    // We have an unexpected error here, the user should be logged!
                    if(!data){
                        $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                        return $q.reject();
                    }
                    return data;
                });
            })
            .catch(function (err) {
                $log.debug('AuthenticationService -> login -> login failed');
                return $q.reject(err);
            });
    }

    /**
     * Process a user registration.
     * @param string email
     * @param string password
     * @returns promise with user data or error.
     */
    function register(email, password){
        return $http.post(CONFIG.route.register, { email: email, password: password })
            .then(function (data) {
                $log.debug('AuthenticationService.register -> success: ' + data.data);

                // save access token for futur request
                $localStorage.set('access_token', data.data[MAPPERS.RESPONSE_ACCESS_TOKEN]);

                // Load account information, now this method should work.
                // will return data or null
                return UserService.me().then(function(data){
                    // We have an unexpected error here, the user should be logged!
                    if(!data){
                        $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                        return $q.reject();
                    }
                    return data;
                });
            })
            .catch(function (err) {
                $log.debug('AuthenticationService -> login -> login failed');
                return $q.reject(err);
            });
    }

}