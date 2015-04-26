'use strict';

angular.module('starter.routes')
    .config(routes);

function routes($stateProvider, $urlRouterProvider) {

    // if none of the above states are matched, use this as the fallback
    // READ IT : when app is launching this route is called and is then viewed for a second while application take control
    $urlRouterProvider.otherwise('home');

    $stateProvider

        .state('blank', {
            url: '/blank',
            template: 'App is loading'
        })
        
        // Welcome page
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'templates/welcome.html',
            controller: 'WelcomeCtrl',
            onEnter: function($ionicHistory, $ionicNavBarDelegate, $state, CONFIG, $rootScope, $log){
                //$ionicHistory.clearHistory();
                //$ionicNavBarDelegate.showBackButton(false);
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
                noAuthRequired: true
            }
        })
        
        .state('register', {
            url: "/register",
            templateUrl: "templates/auth/register.html",
            controller: 'RegisterCtrl',
            data: {
                noAuthRequired: true
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