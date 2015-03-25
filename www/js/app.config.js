'use strict';

angular.module('starter')
    
.constant('CONFIG', {
     foo: 'bar'   
})
    
.config(function($stateProvider, $urlRouterProvider) {

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/events');
        
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        })

        // Event list
        .state('app.events', {
            url: "/events",
            views: {
                'menuContent': {
                    templateUrl: "templates/events.html",
                    controller: 'EventsCtrl'
                }
            }
        })

        .state('app.search', {
            url: "/search",
            views: {
                'menuContent': {
                    templateUrl: "templates/search.html"
                }
            }
        })

        .state('app.browse', {
            url: "/browse",
            views: {
                'menuContent': {
                    templateUrl: "templates/browse.html"
                }
            }
        })

        .state('app.single', {
            url: "/playlists/:playlistId",
            views: {
                'menuContent': {
                    templateUrl: "templates/playlist.html",
                    controller: 'PlaylistCtrl'
                }
            }
        });
    
    
});