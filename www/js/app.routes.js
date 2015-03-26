'use strict';

angular.module('starter.routes')
    .config(routes);

function routes($stateProvider, $urlRouterProvider) {

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/events');

    $stateProvider

        // Main view
        // Template based on a sidebar and custom content in the middle
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/sidebar.html",
            controller: 'AppCtrl'
        })

        .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl',
            data: {
                title: 'Login'
            }
        })

        .state('logout', {
            url: '/logout',
            templateUrl: "",
            controller: 'LogoutCtrl'
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

        // Contacts list
        .state('app.contacts', {
            url: "/contacts",
            views: {
                'menuContent': {
                    templateUrl: "templates/contacts.html",
                    controller: 'ContactsCtrl'
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

}