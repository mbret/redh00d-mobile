'use strict';

angular.module('starter.services')
    .factory('UserService', UserService);

UserService.$injector = ['$http', 'CONFIG', '$rootScope', '$log', '$localStorage'];
function UserService($http, CONFIG, $rootScope, $log, $localStorage){

    var service = {

        me: function(){
            return $http.get(CONFIG.route.me)
                .success(function (data, status, headers, config) {
                    $log.debug('UserService -> me -> data : ', data);
                    return data;
                })
                .error(function (data, status, headers, config) {
                    $log.debug(data);
                });
        }

    };
    return service;

}