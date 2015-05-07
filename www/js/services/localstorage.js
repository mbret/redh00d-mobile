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

            /**
             * Support string & boolean. If a boolean is detected (true / false) then it will return a boolean type instead of a string.
             * @example if($localStorage.get('myBoolean', false)){ ...
             * @example if($localStorage.get('myString', null) == 'foo' || $localStorage.get('myString', null) == null){ ...
             * @param key
             * @param defaultValue
             * @returns {*}
             */
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