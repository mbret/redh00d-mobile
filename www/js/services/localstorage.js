'use strict';

angular.module('starter.services')

    .factory('$localStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                if( typeof value !== 'undefined' ){
                    $window.localStorage[key] = value;
                }
            },
            delete: function(key){
                $window.localStorage.removeItem(key);
            },
            get: function(key, defaultValue) {
                var value = $window.localStorage[key] || defaultValue;
                if(value == "true") return true;
                else if(value == "false") return false;
                else return value;
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