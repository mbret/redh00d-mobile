'use strict';

angular.module('starter.services')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$injector = ['$http', 'CONFIG', '$rootScope', '$log'];
function AuthenticationService($http, CONFIG, $rootScope, $log){

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
                    $log.debug('authentication success');
                    //$http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1

                    // Need to inform the http-auth-interceptor that
                    // the user has logged in successfully.  To do this, we pass in a function that
                    // will configure the request headers with the authorization token so
                    // previously failed requests(aka with status == 401) will be resent with the
                    // authorization token placed in the header
                    //authService.loginConfirmed(data, function(config) {  // Step 2 & 3
                    //    config.headers.Authorization = data.authorizationToken;
                    //    return config;
                    //});
                })
                .error(function (data, status, headers, config) {
                    $log.debug('authentication error');
                    $rootScope.$broadcast('event:auth-login-failed', status);
                });
        },

        logout: function(user) {
            $http.post('https://logout', {}, { ignoreAuthModule: true })
                .finally(function(data) {
                    delete $http.defaults.headers.common.Authorization;
                    $rootScope.$broadcast('event:auth-logout-complete');
                });
        },

        loginCancelled: function() {
            authService.loginCancelled();
        }
    };
    return service;

}