'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngCordova',
    'starter.routes',
    'starter.controllers',
    'starter.services'
])
.run(run);

angular.module('starter.services', []);
angular.module('starter.controllers', []);
angular.module('starter.routes', []);

function run($ionicPlatform, $rootScope, $state, user, UserService, CONFIG, $log, $ionicLoading, EVENTS, $cordovaToast, MESSAGES) {

    // http://ngcordova.com/docs/common-issues/
    $ionicPlatform.ready(function() {

        $ionicLoading.show();
        
        // Inject some config/constant in views
        $rootScope.CONFIG = CONFIG;
        
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Listen for app ready event
        $rootScope.$on(EVENTS.APP_READY, function (event, data) {
            console.log('event -> ', EVENTS.APP_READY);

            // Hide ionic loading screen as our app is ready to use
            $ionicLoading.hide();
            
            // Add a listening to remove the loading screen after each transition
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $log.debug('event -> $stateChangeSuccess -> ' + toState.name);
                //$ionicLoading.hide();
            });

            $rootScope.$on(EVENTS.SHOW_LOADING, function(event, data){
                $log.debug('event -> ', EVENTS.SHOW_LOADING);
                $ionicLoading.show();
            });

            $rootScope.$on(EVENTS.HIDE_LOADING, function(event, data){
                $log.debug('event -> ', EVENTS.HIDE_LOADING);
                $ionicLoading.hide();
            });

        });

        $rootScope.$on(EVENTS.UNEXPECTED_ERROR, function(event, data){
            $log.debug('event -> ', EVENTS.UNEXPECTED_ERROR);
            $cordovaToast.showLongBottom(MESSAGES.UNEXPECTED_ERROR);
        });
        
        // Simulate a little timeout for a better app loading effect.
        // We have time to see loading even if app start really fast
        setTimeout(function(){
            
            // Try to get user information if authentication is still valid
            $log.debug('app -> run -> try to authenticate user');
            UserService.me()
                .then(function(data){
                    if(data){
                        $log.debug('app -> run -> user automatically authenticated, login bypassed');
                        angular.extend(user, data);
                        $state.go(CONFIG.state.home);
                        // ...
                    }
                    else{
                        $log.debug('app -> run -> user could not be authenticated, login needed');
                        UserService.cleanLocalTraces(); // clean everything about a possible previous user (like tokens, ...)
                        $state.go(CONFIG.state.login);
                        // ...
                    }
                })
                .finally(function(){
                    // At this point the app is ready, there are no more critical process to run before user can use app.
                    $rootScope.$emit(EVENTS.APP_READY); // firing an event upwards
                });
            
        }, 1000);

    });
}