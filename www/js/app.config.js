'use strict';

angular.module('starter')
    .value('user', {
        authenticated: false // pass to true to bypass login
    })
    .config(function($provide) {
        var apiUrl = 'https://localhost:1340';
        var config = {
            apiUrl: apiUrl,
            route: {
                login: apiUrl + '/auth/login',
                facebookAuth: apiUrl + '/auth/facebook',
                me: apiUrl + '/helper/me'
            },
            state: {
                home: 'app.contacts.list',
                login: 'login'
            }
        };
        $provide.constant('CONFIG', config);
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpResponseInterceptor');
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }])
    .config(configureIonic);


function configureIonic($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); //Places them at the bottom for all OS
}