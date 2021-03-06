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
        
        .state('events',{
            url: '/events',
            templateUrl: 'templates/events.html',
            controller: 'EventsCtrl',
            data: {
                authRequired: true
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

        .state('credential-lost', {
            url: '/credential-lost',
            templateUrl: 'templates/auth/credential-lost.html',
            controller: 'CredentialLostCtrl',
            data: {
                authRequired: false,
                accessibleWhenAuthenticated: false
            }
        })

        // A route exist for logout, this is a simple route without any display.
        .state('logout', {
            url: '/logout',
            cache: false, // the route is init each time
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
            url: '/detail/:id',
            views: {
                'list-tab': {
                    templateUrl: "templates/contacts/contacts-detail.html",
                    controller: 'ContactsDetailCtrl'
                }
            }
        })
        .state('contacts.create', {
            url: '/create',
            views: {
                'list-tab': {
                    templateUrl: "templates/contacts/contacts-create.html",
                    controller: 'ContactsDetailCtrl'
                }
            }
        })
        //.state('contacts.groups', {
        //    url: "/groups",
        //    abstract: true,
        //    views: {
        //        'groups-tab': {
        //            template: "<ion-nav-view ></ion-nav-view>",
        //            controller: 'ContactsGroupsCtrl'
        //        }
        //    }
        //})
        .state('contacts.groupsList', {
            url: "/groups/list",
            views: {
                'groups-tab': {
                    templateUrl: "templates/contacts/contacts-groups-list.html",
                    controller: 'ContactsGroupsDetailCtrl'
                }
            },
            //templateUrl: "templates/contacts/contacts-groups-list.html",
            //controller: 'ContactsGroupsDetailCtrl'
        })
        .state('contacts.groupsCreate', {
            url: "/groups/create",
            views: {
                'groups-tab': {
                    templateUrl: "templates/contacts/contacts-groups-create.html",
                    controller: 'ContactsGroupsCreateCtrl'
                }
            },
            //templateUrl: "templates/contacts/contacts-groups-create.html",
            //controller: 'ContactsGroupsCreateCtrl'
        });


}