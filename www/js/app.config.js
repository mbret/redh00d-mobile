'use strict';

angular.module('starter')
    .config(configureInterceptorsfunction)
    .config(configureIonic);

/*
 * Interceptors are intern components to angular that watch before something.
 * Here we push some app's custom interceptor to add behaviour like intercept request and response
 * and do something with it.
 */
function configureInterceptorsfunction($httpProvider) {
    $httpProvider.interceptors.push('httpResponseInterceptor');
    $httpProvider.interceptors.push('httpRequestInterceptor');
}

/*
 * Use this function to configure ionic core behaviour.
 */
function configureIonic($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); //Places them at the bottom for all OS
}