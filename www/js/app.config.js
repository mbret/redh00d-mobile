'use strict';

angular.module('starter')

    .constant('_', window._)

    .constant('EVENTS', {
        USER_LOGGED_OUT: 'userLoggedOut',

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
        RESPONSE_ACCESS_TOKEN: 'token', // token json label for /auth
        RESPONSE_CODE_E_EMAIL_ALREADY_TAKEN: 'E_EMAIL_ALREADY_TAKEN'
    })

    .constant('STORAGE_KEYS', {
        HIDE_WELCOME: 'hide_welcome',
        ACCESS_TOKEN: 'access_token'
    })

    .config(configureUser)
    .config(configureCONFIG)
    .config(configureAppConfig)
    .config(configureInterceptorsfunction)
    .config(configureIonic);

/*
 * Configure the user object.
 * This object is used through the app to store the current logged user.
 */
function configureUser($provide) {
    $provide.value('user', {
        authenticated: false // pass to true to bypass login
    });
}

/*
 * This function define the global app config.
 * You can add whatever you want and use it inside the app by simply calling CONFIG constant.
 */
function configureCONFIG($provide, LOCAL_CONFIG, _) {
    var apiUrl = 'https://192.168.1.24:1340';
    if(LOCAL_CONFIG.config.apiUrl) apiUrl = LOCAL_CONFIG.config.apiUrl;
    var config = {
        apiUrl: apiUrl,
        allowCordova: true,
        route: {
            login: apiUrl + '/auth/login',
            register: apiUrl + '/auth/register',
            facebookAuth: apiUrl + '/auth/facebook',
            me: apiUrl + '/helper/me',
            contacts: {
                fetchAll: '/users/:userid/friends',
            },
            users: {
                fetch: '/users/:id'
            }
        },
        state: {
            home: 'events',
            login: 'login',
            logout: 'logout',
            register: 'register',
            forgotpassword: 'register',
            welcome: 'welcome',
            contacts: {
                list: 'contacts.list',
                groups: 'contacts.groups',
                detail: 'contacts.detail'
            },
            settings: 'settings'
        }
    };
    config = _.merge(config, LOCAL_CONFIG.config);
    $provide.constant('CONFIG', config);
}

function configureAppConfig($provide, _){
    
    $provide.value('APP_CONFIG', {
        setting_1: 'foo'
    });
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
