(function(){

    'use strict';

    angular.module('starter.services')
        .factory('Contacts', ContactsService);

    function ContactsService($http, $log, CONFIG, EVENTS, $q, $rootScope){

        return {

            /**
             *
             * @param userId the user id you want to fetch friends
             * @returns {*|Promise.<T>}
             */
            fetchAll: function(userId){
                return $http.get(CONFIG.apiUrl + CONFIG.route.contacts.fetchAll.replace(':userid', userId))
                    .then(function(data) {
                        $log.debug('ContactsService:fetchAll', data.data);
                        var contacts = data.data;
                        return contacts;
                    })
                    .catch(function(err) {
                        $log.warn('ContactsService:fetchAll: Failure loading contacts');
                        $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                        return $q.reject(err);
                    });
            },

            /**
             *
             * @param userId the contact id
             */
            fetch: function(contactId){
                return $http.get(CONFIG.apiUrl + CONFIG.route.users.fetch.replace(':id', contactId))
                    .then(function(data) {
                        $log.debug('ContactsService:fetch', data.data);
                        var contact = data.data;
                        return contact;
                    })
                    .catch(function(err) {
                        $log.warn('ContactsService:fetch: Failure loading contact');
                        $rootScope.$broadcast(EVENTS.UNEXPECTED_ERROR);
                        return $q.reject(err);
                    });
            }

        };

    }

})();