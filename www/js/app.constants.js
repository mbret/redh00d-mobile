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
        SERVER_ACCESS_ERROR: 'appServerAccessError',
        SERVER_UNAUTHENTICATED_ERROR: 'appServerResponseUnauthenticated',
        REQUEST_SENT: 'appRequestSent',
        RESPONSE_RECEIVED: 'appResponseReceived'
    })

    // Use these constants to set general messages relative to the entire app.
    .constant('MESSAGES', {
        SERVER_ACCESS_ERROR: 'We are having troubles contacting our server!',
        SERVER_UNAUTHENTICATED_ERROR: 'You have been logged out',
        UNEXPECTED_ERROR: 'An unexpected error happened!'
    })

    // Use these constants to map API returns with local app.
    // It avoid to search and replace when changes are made on API side.
    .constant('MAPPERS', {
        RESPONSE_ACCESS_TOKEN: 'token' // token json label for /auth
    })
    
    .constant('STORAGE_KEYS', {
        HIDE_WELCOME: 'hide_welcome',
        ACCESS_TOKEN: 'access_token'
    })
    
    .config(configureUser)
    .config(configureCONFIG)

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
    if(LOCAL_CONFIG.config.apiUrl) apiUrl = LOCAL_CONFIG.config.apiUrl;
    var config = {
        apiUrl: apiUrl,
        allowCordova: true,
        route: {
            login: apiUrl + '/auth/login',
            register: apiUrl + '/auth/register',
            facebookAuth: apiUrl + '/auth/facebook',
            me: apiUrl + '/helper/me'
        },
        state: {
            blank: 'blank',
            home: 'events',
            login: 'login',
            register: 'register',
            forgotpassword: 'register',
            welcome: 'welcome'
        }
    };

    config = angular.extend(config, LOCAL_CONFIG.config);
    $provide.constant('CONFIG', config);
}