(function(){

    'use strict';

    angular.module('starter.services')
        .factory('Contacts', ContactsService);

    function ContactsService($http, $log, CONFIG, EVENTS, $q, $rootScope){

        return {

            fetchAll: function(userId){
                return $http.get(CONFIG.route.contacts.fetchAll.replace(':userid', userId))
                    .then(function(data) {
                        $log.debug('ContactsService:fetchAll', data.data);
                        var widgets = data.data;
                        return widgets;
                    })
                    .catch(function(err) {
                        $log.warn('ContactsService:fetchAll: Failure loading widgets');
                        $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                        return $q.reject(err);
                    });
            }

        };

    }

})();