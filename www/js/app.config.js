'use strict';

angular.module('starter')
    .value('user', {
        authenticated: false // pass to true to bypass login
    })
    .constant('CONFIG', {
        route: {
            login: 'https://localhost:1337/login'
        },
        state: {
            home: 'app.events'
        }
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpResponseInterceptor');
    }]);