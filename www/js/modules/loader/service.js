(function(){

    'use strict';

    /**
     * @todo use external template for html
     */
    angular.module('modules.loader', ['ng'])
        .factory('loaderService', loaderService);

    loaderService.$injector = ['$templateRequest', '$templateCache'];

    function loaderService($templateRequest, $templateCache){

        var template1 = '<div class="template1">' +
                            '<div class="app-loader">' +
                                '<div class="loader">' +
                                    '<span></span><span></span><span></span>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

        var template2 = '<div class="app-loader template2">' +
                            '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>' +
                        '</div>';

        return {
            show: function(){
                var element = angular.element(document.querySelector('body'));
                element.append(template1);
            },

            hide: function(){
                var element = angular.element(document.querySelector('.app-loader'));
                element.remove();
            }
        }



    }

})();