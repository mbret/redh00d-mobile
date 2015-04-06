'use strict';

angular.module('starter.services')

    .factory('$localStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            delete: function(key){
                $window.localStorage.removeItem(key);
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            has: function(key){
                return ($window.localStorage[key]) ? true : false;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);