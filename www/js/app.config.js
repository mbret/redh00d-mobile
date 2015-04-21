'use strict';

angular.module('starter')
    
    .constant('EVENTS', {
        // The APP_READY event should be called when the app is ready to use for the user.
        // Typically the app is launched by OS, then cordova launch and then our app launch interval is thrown
        // after $ionicPlatform.ready and whatever we define.
        APP_READY: 'appReady',
        // This event should be called when an unexpected error happened
        // It concern an error that it's not normal and is out of control for the app. It's a critical error.
        // Server response error, server unreachable or invalid input are not this kind of error we are talking about.
        UNEXPECTED_ERROR: 'appUnexpectedError',
        SHOW_LOADING: 'appShowLoading',
        HIDE_LOADING: 'appHideLoading'
    })

    // Use these constants to set general messages relative to the entire app.
    .constant('MESSAGES', {
        SERVER_ACCESS_ERROR: 'We are having troubles contacting our server!',
        UNEXPECTED_ERROR: 'An unexpected error happened!'
    })

    // Use these constants to map API returns with local app.
    // It avoid to search and replace when changes are made on API side.
    .constant('MAPPERS', {
        RESPONSE_ACCESS_TOKEN: 'token' // token json label for /auth
    })
    
    .config(configureUser)
    .config(configureCONFIG)
    .config(configureInterceptorsfunction)
    .config(configureIonic);

/*
 * Configure the user object.
 * This object is used through the app to store the current logged user.
 */
function configureUser($provide) {
    $provide.constant('user', {
        authenticated: false // pass to true to bypass login
    });
}

/*
 * This function define the global app config.
 * You can add whatever you want and use it inside the app by simply calling CONFIG constant.
 */
function configureCONFIG($provide, LOCAL_CONFIG) {
    var apiUrl = 'https://192.168.1.24:1340';
    if(LOCAL_CONFIG.apiUrl) apiUrl = LOCAL_CONFIG.apiUrl;
    var config = {
        apiUrl: apiUrl,
        route: {
            login: apiUrl + '/auth/login',
            register: apiUrl + '/auth/register',
            facebookAuth: apiUrl + '/auth/facebook',
            me: apiUrl + '/helper/me'
        },
        state: {
            home: 'app.contacts.list',
            login: 'auth.login',
            register: 'auth.register',
            forgotpassword: 'auth.register'
        }
    };

    config = angular.extend(config, LOCAL_CONFIG.config);
    $provide.constant('CONFIG', config);
}

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