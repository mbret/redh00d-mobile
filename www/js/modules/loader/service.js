(function(){

    'use strict';

    /**
     * @todo use external template for html
     */
    angular.module('modules.loader', ['ng'])
        .factory('loaderService', loaderService);

    loaderService.$injector = ['$templateRequest', '$templateCache'];

    function loaderService($templateRequest, $templateCache){

        //return {

            //$get: function(){
                return {
                    show: function(){
                        var element = angular.element(document.querySelector('body'));
                        element.append('<div class="app-loader"><div class="wrapper"><div class="inner-wrapper"><div class="loader"><span></span><span></span><span></span></div></div></div></div>');
                    },

                    hide: function(){
                        var element = angular.element(document.querySelector('.app-loader'));
                        element.remove();
                    }
                }
            //}

        //};

    }

})();