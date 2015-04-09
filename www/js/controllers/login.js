'use strict';

angular.module('starter.controllers')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$injector = ['$rootScope', '$scope', '$log', 'popupService', 'user', '$state', '$ionicLoading', '$ionicPopup', 'AuthenticationService', 'CONFIG', '$localStorage', 'UserService', '$cordovaOauth', '$cordovaInAppBrowser'];
function LoginCtrl($rootScope, $scope, $log, popupService, user, $state, $ionicLoading, $ionicPopup, AuthenticationService, CONFIG, $localStorage, UserService, $cordovaOauth, $cordovaInAppBrowser) {

    $scope.data = {
        email: 'user@user.com',
        password: 'password'
    };

    // dev bypass
    if(user.authenticated === true){
        $state.go(CONFIG.state.home);
    }

    /**
     *  
     */
    $scope.sdf = function(){
        $ionicPopup.alert({
            title: 'Error!',
            template: 'Not yet supported'
        });
    };

    /**
     * Perform the login action when the user submits the login form
     * @param provider
     */
    $scope.doLogin = function(provider) {
        console.log(provider);
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
            //window.open('http', '_blank', 'location=no,toolbar=no');
            //$cordovaOauth.facebook("440811692744629", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            //    $localStorage.set('accessToken', result.access_token);
            //    console.log(result);
            //}, function(error){
            //    popupService.error(error);
            //    $log.error(error);
            //});
        }
        else{
            $ionicLoading.show({
                template: 'Logging in...'
            });

            // "Log user" -> request a access token
            AuthenticationService.login($scope.data.email, $scope.data.password)
                .then(function(){
                    // Load account informations
                    UserService.me().then(function(data){
                        angular.extend(user, data);
                        $state.go(CONFIG.state.home);
                    });
                })
                .catch(function(err){
                    $ionicLoading.hide();
                    
                    // Bad request
                    if(err && err.status && err.status == 400){
                        popupService.badCredentials();
                    }
                });
        }

    };
    
}