'use strict';

angular.module('starter.routes')
    .config(routes);

function routes($stateProvider, $urlRouterProvider) {

    // if none of the above states are matched, use this as the fallback
    // READ IT : when app is launching this route is called and is then viewed for a second while application take control
    $urlRouterProvider.otherwise('welcome');

    $stateProvider

        // Welcome page
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'templates/welcome.html',
            controller: 'WelcomeCtrl',
            onEnter: function($localStorage, STORAGE_KEYS, $state, CONFIG){
                if($localStorage.get(STORAGE_KEYS.HIDE_WELCOME)){
                    $state.go(CONFIG.state.home);
                }
            }
        })
        
        .state('events',{
            url: '/events',
            templateUrl: 'templates/events.html',
            controller: 'EventsCtrl'
        })
        
        // Main and default view
        // Template based on a sidebar and custom content in the middle
        .state('app', {
            url: "/app",
            abstract: true,
            template: '<ion-nav-view></ion-nav-view>',
            controller: 'AppCtrl'
        })

        .state('auth', {
            url: '/auth',
            abstract: true,
            templateUrl: "templates/auth/index.html"
        })
        .state('auth.login', {
            url: "/login",
            templateUrl: "templates/auth/login.html",
            controller: 'LoginCtrl',
            data: {
                title: 'Login'
            }
        })
        .state('auth.register', {
            url: "/register",
            templateUrl: "templates/auth/register.html",
            controller: 'RegisterCtrl',
            data: {
                title: 'Register'
            }
        })

        .state('logout', {
            url: '/logout',
            templateUrl: "<ion-nav-view></ion-nav-view>",
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