'use strict';

angular.module('starter.controllers')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$injector = ['$rootScope', '$scope', '$log', 'popupService', 'user', '$state', '$ionicHistory', '$ionicPopup', 'authenticationService', 'CONFIG', '$localStorage', 'UserService', '$cordovaOauth', '$cordovaInAppBrowser'];
function LoginCtrl($rootScope, $scope, $log, popupService, user, $state, $ionicHistory, $ionicPopup, authenticationService, CONFIG, $localStorage, UserService, $cordovaOauth, $cordovaInAppBrowser) {

    $scope.data = {
        email: 'user@fake.com',
        password: 'password'
    };

    /**
     * Perform the login action when the user submits the login form
     * http://codepen.io/gvarela/pen/KwJdEN
     * https://calendee.com/2014/12/26/validation-in-ionic-framework-apps-with-ngmessages/
     * https://github.com/mbret/theboard-client/blob/develop/assets/app/views/templates/modals/widget-profile-settings.html
     * @param provider
     */
    $scope.doLogin = function(form, provider) {

        if(form.$valid === false){
            popupService.badForm();
        }
        else{
            // Log in with provider (Facebook, Google, etc)
            if(provider){
                var options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                };
                $cordovaInAppBrowser.open(CONFIG.route.facebookAuth, '_blank', options)
                    .then(function(event) {
                        $localStorage.set('accessToken', result.access_token);
                        console.log(result);
                    })
                    .catch(function(event) {
                        popupService.error(event);
                        $log.error(event);
                    });
                $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
                    $log.debug('$cordovaInAppBrowser:loadstart');
                });

                $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
                    $log.debug('$cordovaInAppBrowser:loadstop');
                });

                $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){
                    $log.debug('$cordovaInAppBrowser:loaderror');
                });

                $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
                    $log.debug('$cordovaInAppBrowser:exit');
                });

            }
            // Login with credentials
            else{
                authenticationService.login($scope.data.email, $scope.data.password)
                    .then(function(data){
                        angular.extend(user, data);

                        $ionicHistory.nextViewOptions({ disableBack: true });
                        $state.go(CONFIG.state.home);
                    })
                    .catch(function(err) {
                        // Bad request
                        if(err && err.status && err.status === 400){
                            popupService.show(popupService.template.BAD_CREDENTIAL);
                        }
                    });
            }
        }

    };


    
}