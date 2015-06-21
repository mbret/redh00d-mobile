(function(){

    'use strict';

    angular.module('starter.services')
        .factory('loaderService', loaderService);

    loaderService.$injector = [];


    function loaderService(){

        return {

            show: function(){

            },

            hide: function(){
                var element = angular.element(document.querySelector('.app-loader'));
                element.remove();
            }
        };

    }

})();

