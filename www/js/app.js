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

function run($ionicPlatform, $state, user, UserService, CONFIG, $log, $cordovaSplashscreen, $cordovaInAppBrowser) {


    // http://ngcordova.com/docs/common-issues/
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
        // Try to get user information if authentication is still valid
        $log.debug('app -> run -> try to authenticate user');
        UserService.me()
            .then(function(data){
                $log.debug('app -> run -> user automatically authenticated, login bypassed');
                angular.extend(user, data);
                $state.go(CONFIG.state.home);
            })
            .catch(function(err){
                $log.debug('app -> run -> user could not be authenticated, login needed');
                $state.go(CONFIG.state.login);
            });

    });
}