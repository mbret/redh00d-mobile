'use strict';

angular.module('starter')
    .value('user', {
        authenticated: false // pass to true to bypass login
    })
    .constant('CONFIG', {
         foo: 'bar'   
    });