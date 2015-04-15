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
    
    .constant('MESSAGES', {
        SERVER_ACCESS_ERROR: 'We are having troubles contacting our server!',
        UNEXPECTED_ERROR: 'An unexpected error happened!'
    })

    .constant('MAPPERS', {
        RESPONSE_ACCESS_TOKEN: 'token'
        
    })
    
    .config(configureUser)
    .config(configureCONFIG)
    .config(configureInterceptorsfunction)
    .config(configureIonic);


function configureUser($provide) {
    $provide.constant('user', {
        authenticated: false // pass to true to bypass login
    });
}

function configureCONFIG($provide) {
    var apiUrl = 'https://192.168.1.24:1340'; // maxime desktop
    //var apiUrl = 'https://10.42.43.8:1340'; // maxime bourso
    //var apiUrl = 'https://yourip:1340'; // define your own
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
    $provide.constant('CONFIG', config);
}

function configureInterceptorsfunction($httpProvider) {
    $httpProvider.interceptors.push('httpResponseInterceptor');
    $httpProvider.interceptors.push('httpRequestInterceptor');
}

function configureIonic($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); //Places them at the bottom for all OS
}