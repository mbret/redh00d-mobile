'use strict';

/**
 * This file is used to set local configuration. It allow anyone to use specific settings relative to
 * its work station. Some config like LOCAL_CONFIG.bypassLogin are used to get more convenience when coding.
 * However the LOCAL_CONFIG.config directly override the app CONFIG.
 */
(function(){
    angular.module('starter')

        .constant('LOCAL_CONFIG', {

            // By pass the login section (useful to rapidly test application)
            bypassLogin: false,

            // This part will be merged into CONFIG constants.
            // It will take priority on app.config.js
            config: {

                // Set your web service url here. The url of the web service is displayed when lifted.
                apiUrl: 'https://localhost:1340'
            }
        });
})();
