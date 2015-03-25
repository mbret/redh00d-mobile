'use strict';

angular.module('starter.services')
    .factory('Events', EventsService);

function EventsService(){

    return {

        fetchAll: function(){
            return [
                { title: 'Event 1', description: 'First description', date: null },
                { title: 'Event 2', description: 'Another description', date: null },
                { title: 'Event 3', description: 'Another another description', date: null }
            ];
        }

    };
    
}