'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
        'ng',
        'ionic',
        'ngCordova',
        'starter.routes',
        'starter.controllers',
        'starter.services'
    ])
    .run(initAppSettings)
    .run(run);

angular.module('starter.services', []);
angular.module('starter.controllers', []);
angular.module('starter.routes', []);

// Manually bootstrap application
// So we can load config from server or do some stuff before
// ionic / angular job
angular.element(document).ready(function() {
    //angular.injector(['ng', 'starter']);
    //var $ionicPlatform = initInjector.get("$ionicPlatform");
    //console.log($ionicPlatform);

    setTimeout(function(){

        // We use here ionic instead of $ionicPlatform.ready in order to run angular app ONLY when
        // ionic platform is ready. We ensure no side effect
        ionic.Platform.ready(function() {
            angular.bootstrap(document, ['starter']);
        });
    }, 2000);
});


/**
 *
 * @param APP_CONFIG
 * @param $localStorage
 * @param _
 */
function initAppSettings(APP_CONFIG, $localStorage, _){
    if($localStorage.has('settings')){
        _.merge(APP_CONFIG, $localStorage.getObject('settings', {}));
    }
}

/**
 * Main run method
 * @param $ionicPlatform
 * @param popupService
 * @param $rootScope
 * @param $state
 * @param user
 * @param $localStorage
 * @param STORAGE_KEYS
 * @param CONFIG
 * @param LOCAL_CONFIG
 * @param $log
 * @param $ionicLoading
 * @param EVENTS
 * @param $ionicHistory
 * @param MESSAGES
 * @param toastService
 * @param authenticationService
 */
function run($ionicPlatform, loaderService, popupService, $rootScope, $state, user, $localStorage, STORAGE_KEYS, CONFIG, LOCAL_CONFIG, $log, $ionicLoading, EVENTS, $ionicHistory, MESSAGES, toastService, authenticationService) {

    /* -----------------------------------------------------
     *
     *          Run startup logic
     *
     *  ---------------------------------------------------- */

    // Inject config inside scope, in that way we can use state.foo for example inside html
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

    // Add event for our application
    $rootScope.$on(EVENTS.USER_LOGGED_OUT, onUserLoggedOut);
    $rootScope.$on(EVENTS.UNEXPECTED_ERROR, onUnexpectedError);
    $rootScope.$on(EVENTS.SERVER_ACCESS_ERROR, onServerAccessError);
    $rootScope.$on(EVENTS.SERVER_UNAUTHENTICATED_ERROR, onServerResponseUnauthenticated);
    $rootScope.$on(EVENTS.REQUEST_SENT, onRequestSent);
    $rootScope.$on(EVENTS.RESPONSE_RECEIVED, onResponseReceived);

    // Add events relative to routing
    $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
    $rootScope.$on('$stateChangeStart', onStateChangeStart);
    $rootScope.$on('$stateChangeError', onStateChangeError);

    loaderService.hide();

    //$ionicHistory.clearHistory();
    //$ionicHistory.clearCache();

    // Always go to welcome view on startup
    // It will check if user want to hide welcome. Then go to home. If user is not logged go to login
    $ionicHistory.nextViewOptions({ disableAnimate: false, disableBack: true });
    if( $localStorage.has(STORAGE_KEYS.HIDE_WELCOME) && $localStorage.get(STORAGE_KEYS.HIDE_WELCOME, false) ){
        $log.debug('Route welcome is bypassed as user want');
        $state.go(CONFIG.state.home);
    }
    else{
        $state.go(CONFIG.state.welcome);
    }

    /* -----------------------------------------------------
     *
     *          Events functions declaration
     *
     *  ---------------------------------------------------- */

    /*
     * This event is fired when
     */
    function onRequestSent(event, data){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> ', EVENTS.REQUEST_SENT);
        $ionicLoading.show();
    }

    /*
     *
     */
    function onResponseReceived(event, data){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> ', EVENTS.RESPONSE_RECEIVED);
        $ionicLoading.hide();
    }

    /*
     *
     */
    function onStateChangeStart(event, toState, toParams, fromState, fromParams){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> $stateChangeStart -> from ' + fromState.name + ' to ' + toState.name);

        // Prevent navigation to blank
        if( toState.name == CONFIG.state.blank ){
            $log.debug('Route blank is not accessible, event stopped');
            event.preventDefault();
        }

        // Authentication verification
        if(LOCAL_CONFIG.bypassLogin !== true){
            // policy is to require authentication except if specified as not
            if(!(toState.data && toState.data.authRequired === false) && !authenticationService.isAuthenticated()){
                // User is not authenticated
                $log.debug('Route require authentication and user is not, redirected to ' + CONFIG.state.login);
                event.preventDefault();
                $state.go(CONFIG.state.login);
            }

        }

        // Redirect user if he is already logged
        if( (toState.data && toState.data.accessibleWhenAuthenticated === true) && (toState.name == CONFIG.state.login || toState.name == CONFIG.state.register) && authenticationService.isAuthenticated() ){
            $log.debug('Route ' + toState.name + ' is redirected because user is already logged');
            event.preventDefault();
            $state.go(CONFIG.state.home);
        }
    }

    function onStateChangeError(event, toState, toParams, fromState, fromParams){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> $stateChangeError -> from ' + fromState.name + ' to ' + toState.name);
    }

    /*
     *
     */
    function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> $stateChangeSuccess -> ' + toState.name);
    }

    /*
     *
     */
    function onUnexpectedError(event, data){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> ', EVENTS.UNEXPECTED_ERROR);
        toastService.showLongBottom(MESSAGES.UNEXPECTED_ERROR);
    }

    /*
     *
     */
    function onServerResponseUnauthenticated(event, data){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> ', EVENTS.SERVER_UNAUTHENTICATED_ERROR);
        toastService.showLongBottom(MESSAGES.SERVER_UNAUTHENTICATED_ERROR);

        authenticationService.logout();
        // As the previous view / action thrown 401 error we should not have back button, because we cannot go to back view / action
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go(CONFIG.state.login);
    }

    /*
     *
     */
    function onServerAccessError(event, data){
        if(!LOCAL_CONFIG.hideEventLog) $log.debug('event -> ', EVENTS.SERVER_ACCESS_ERROR);
        toastService.showLongBottom(MESSAGES.SERVER_ACCESS_ERROR);
    }

    function onUserLoggedOut(event, data){
        popupService.show(popupService.template.LOGGED_OUT);
        $state.go(CONFIG.state.login);
    }

}