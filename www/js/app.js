'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngMockE2E',
    'starter.routes',
    'starter.controllers',
    'starter.services'
])
    .run(fakeBackend)
    .run(run);

angular.module('starter.services', []);
angular.module('starter.controllers', []);
angular.module('starter.routes', []);

function run($ionicPlatform, $state, user) {
    
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
        $state.go('login');
    });
}

function fakeBackend($ionicPlatform, $httpBackend){

    //console.log($httpBackend);
    var events = [
        { title: 'Event 1', description: 'First description', date: null },
        { title: 'Event 2', description: 'Another description', date: null },
        { title: 'Event 3', description: 'Another another description', date: null }
    ];

    // returns the current list of customers or a 401 depending on authorization flag
    $httpBackend.whenGET('https://events').respond(function (method, url, data, headers) {
        return authorized ? [200, events] : [401];
    });
    $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
        authorized = true;
        return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
    });
    $httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
        authorized = false;
        return [200];
    });
    // All other http requests will pass through
    $httpBackend.whenGET(/.*/).passThrough();
}