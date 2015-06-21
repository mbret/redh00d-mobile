'use strict';

angular.module('starter.services')
    .factory('Contacts', ContactsService);

function ContactsService(){

    return {

        fetchAll: function(){
            return [
                { title: 'Contact 1', description: 'First description', date: null },
                { title: 'Contact 2', description: 'Another description', date: null },
                { title: 'Contact 3', description: 'Another description', date: null },
                { title: 'Contact 4', description: 'Another description', date: null },
                { title: 'Contact 5', description: 'Another description', date: null },
                { title: 'Contact 6', description: 'Another description', date: null },
                { title: 'Contact 7', description: 'Another description', date: null },
                { title: 'Contact 8', description: 'Another description', date: null },
                { title: 'Contact 9', description: 'Another another description', date: null }
            ];
        }

    };
    
}