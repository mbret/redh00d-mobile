'use strict';

angular.module('starter.services')
    .factory('authenticationService', authenticationService);

authenticationService.$injector = ['$http', 'CONFIG', '$q', '$log', '$localStorage', 'UserService', '$rootScope', 'EVENTS', 'MAPPERS', 'STORAGE_KEYS'];
function authenticationService($http, CONFIG, $q, $log, $localStorage, UserService, $rootScope, EVENTS, MAPPERS, STORAGE_KEYS){

    return {

        /**
         * Check if the user is authenticated with the server.
         * This method is local only. It's based on cache/local storage.
         * The user could be unauthenticated with server for many reason but this method simple protect ux design.
         */
        isAuthenticated: function isAuthenticated(){
            // We suppose that if user has access_token then he is authenticated
            if($localStorage.has(STORAGE_KEYS.ACCESS_TOKEN)){
                return true;
            }
            else{
                return false;
            }
        },

        /**
         * Process a user registration.
         * @param string email
         * @param string password
         * @returns promise with user data or error.
         */
        register: function register(email, password){
            return $http.post(CONFIG.route.register, { email: email, password: password })
                .then(function (data) {
                    $log.debug('authenticationService.register -> success: ' + data.data);

                    _loginLocal(data.data[MAPPERS.RESPONSE_ACCESS_TOKEN]);

                    // Load account information, now this method should work.
                    // will return data or null
                    return UserService.me().then(function(data){
                        // We have an unexpected error here, the user should be logged!
                        // also note that the user could be logged but .me() method thrown a error ..
                        if(!data){
                            $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                            return $q.reject();
                        }
                        return data;
                    });
                })
                .catch(function (err) {
                    $log.debug('authenticationService -> register -> register failed');
                    return $q.reject(err);
                });
        },

        /**
         * Log in a user according to the given email / password.
         *
         * @param email
         * @param password
         * @returns {*} The user data or error with status code.
         */
        login: function login(email, password) {
            return $http.post(CONFIG.route.login, { email: email, password: password })
                .then(function (data) {
                    $log.debug('authentication success -> access_token : ' + data.data.token);
                    
                    _loginLocal(data.data[MAPPERS.RESPONSE_ACCESS_TOKEN]);
                    
                    // Load account information, now this method should work.
                    // will return data or null
                    return UserService.me().then(function(data){
                        // We have an unexpected error here, the user should be logged!
                        // also note that the user could be logged but .me() method thrown a error ..
                        if(!data){
                            $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                            return $q.reject();
                        }
                        return data.user;
                    });
                })
                .catch(function (err) {
                    $log.debug('authenticationService -> login -> login failed');
                    return $q.reject(err);
                });
        },
        
        logout: function logout() {
            $log.debug('authentication -> logout');
            _logoutLocal();
            return $q.when();
        }
        
    };

    /**
     * Process a login for local app.
     * Use this method after a successful login with server to keep state on the app.
     * @private
     */
    function _loginLocal(token){
        // save access token for futur request
        $localStorage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
    }

    function _logoutLocal(){
        _cleanLocalTraces();
    }
    
    function _cleanLocalTraces(){
        $localStorage.delete('access_token');
        $log.debug('authenticationService:_cleanLocalTraces -> user traces deleted');
    }
}