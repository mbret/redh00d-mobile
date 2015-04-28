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
        
        .state('events',{
            url: '/events',
            templateUrl: 'templates/events.html',
            controller: 'EventsCtrl',
            data: {
                authRequired: true
            }
        })
        
        // Main and default view
        // Template based on a sidebar and custom content in the middle
        .state('app', {
            url: "/app",
            abstract: true,
            template: '<ion-nav-view></ion-nav-view>',
            controller: 'AppCtrl'
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
        

        // Contacts list
        .state('app.contacts', {
            url: "/contacts",
            abstract: true,
            templateUrl: "templates/contacts/tabs.html",
            controller: 'ContactsCtrl'
        })
        .state('app.contacts.list', {
            url: '/contacts/list',
            views: {
                'list': {
                    templateUrl: "templates/contacts/list.html",
                    controller: 'ContactsListCtrl'
                }
            }
        })
        .state('app.contacts.groups', {
            url: '/contacts/groups/:id',
            views: {
                'groups': {
                    templateUrl: "templates/contacts/groups.html",
                    controller: 'ContactsGroupsCtrl'
                }
            }
        })


}