'use strict';

angular.module('starter.services')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$injector = ['$http', 'CONFIG', '$q', '$log', '$localStorage'];
function AuthenticationService($http, CONFIG, $q, $log, $localStorage){

    var service = {

        /**
         *
         * @param email
         * @param password
         * @returns {*}
         */
        login: function(email, password) {
            return $http.post(CONFIG.route.login, { email: email, password: password })
                .success(function (data, status, headers, config) {
                    $log.debug('authentication success -> access_token : ' + data.access_token);
                    
                    // save access token for futur request
                    $localStorage.set('access_token', data.access_token);

                })
                .error(function (data, status, headers, config) {
                    $log.debug('AuthenticationService -> login -> login failed');
                    //$rootScope.$broadcast('event:auth-login-failed', status);
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