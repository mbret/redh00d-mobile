'use strict';

angular.module('starter.routes')
    .config(routes);

function routes($stateProvider, $urlRouterProvider) {

    // if none of the above states are matched, use this as the fallback
    // READ IT : when app is launching this route is called and is then viewed for a second while application take control
    $urlRouterProvider.otherwise('home');

    // If a route is accessible for user unauthenticated you must specified data.authRequired = false.
    // The policy is in strict mod and need auth by default.
    //
    // If you want to block a view when user is logged use data.accessibleWhenAuthenticated = false. This setting is not strict
    // so all routes will be accessible unless you set to false.
    $stateProvider

        .state('blank', {
            url: '/blank',
            template: 'App is loading',
            data: {
                authRequired: false
            }
        })
        
        // Welcome page
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'templates/welcome.html',
            controller: 'WelcomeCtrl',
            onEnter: function($ionicHistory, $ionicNavBarDelegate, $state, CONFIG, $rootScope, $log){
                //$ionicHistory.clearHistory();
                //$ionicNavBarDelegate.showBackButton(false);
            },
            data: {
                authRequired: false
            }
        })


        // Event parts
        .state('events',{
            url: '/events',
            templateUrl: 'templates/events.html',
            controller: 'EventsCtrl',
            data: {
                authRequired: true
            }
        })

        .state('event', {
            abstract: true,
            url: '/event',
            templateUrl: 'templates/event/event.html',
            controller: 'ContactsCtrl'
        })

        .state('event.info', {
            url: "/info",
            views: {
                'info-tab': {
                    templateUrl: "templates/event/event-info.html",
                    controller: 'ContactsListCtrl'
                }
            }
        })

        .state('event.drink', {
                    url: "/drink",
                    views: {
                        'drink-tab': {
                            templateUrl: "templates/event/event-drink.html",
                            controller: 'ContactsListCtrl'
                        }
                    }
                })

         .state('event.guest', {
                     url: "/guest",
                     views: {
                         'guest-tab': {
                             templateUrl: "templates/event/event-guest.html",
                             controller: 'ContactsListCtrl'
                         }
                     }
                 })

        .state('events.details',{
                    url: '/details',
                    templateUrl: 'templates/events/events-details.html',
                    views: {
                            'list-tab': {
                               templateUrl: "templates/events/events-details.html",
                               controller: 'EventsDetailCtrl'
                                        }
                            }
                })
        
        .state('login', {
            url: "/login",
            templateUrl: "templates/auth/login.html",
            controller: 'LoginCtrl',
            data: {
                authRequired: false,
                accessibleWhenAuthenticated: false
            }
        })
        
        .state('register', {
            url: "/register",
            templateUrl: "templates/auth/register.html",
            controller: 'RegisterCtrl',
            data: {
                authRequired: false,
                accessibleWhenAuthenticated: false
            }
        })

        // A route exist for logout, this is a simple route without any display.
        .state('logout', {
            url: '/logout',
            template: "<ion-nav-view></ion-nav-view>",
            controller: 'LogoutCtrl'
        })

        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
        })
        
        // Contacts parts
        .state('contacts', {
            abstract: true,
            url: '/contacts',
            templateUrl: 'templates/contacts/contacts.html',
            controller: 'ContactsCtrl'
        })
        .state('contacts.list', {
            url: "/list",
            views: {
                'list-tab': {
                    templateUrl: "templates/contacts/contacts-list.html",
                    controller: 'ContactsListCtrl'
                }
            }
        })
        .state('contacts.detail', {
            url: '/detail',
            views: {
                'list-tab': {
                    templateUrl: "templates/contacts/contacts-detail.html",
                    controller: 'ContactsDetailCtrl'
                }
            }
        })
        .state('contacts.groups', {
            url: "/groups",
            views: {
                'groups-tab': {
                    templateUrl: "templates/contacts/contacts-groups.html",
                    controller: 'ContactsGroupsCtrl'
                }
            }
        });

}