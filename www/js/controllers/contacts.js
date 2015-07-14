(function(){
    'use strict';

    angular.module('starter.controllers')
        .controller('ContactsCtrl', ContactsCtrl)
        .controller('ContactsListCtrl', ContactsListCtrl)
        .controller('ContactsDetailCtrl', ContactsDetailCtrl)
        .controller('ContactsGroupsCtrl', ContactsGroupsCtrl)
        .controller('ContactsGroupsDetailCtrl', ContactsGroupsDetailCtrl)
        .controller('ContactsGroupsCreateCtrl', ContactsGroupsCreateCtrl);

    ContactsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
    function ContactsCtrl($scope, Contacts, $ionicLoading) {
        console.log('ContactsCtrl');
    }

    /**
     * @todo peut être gérer les messages d'erreur par directive avec des events
     * @type {string[]}
     */
    ContactsListCtrl.$inject = ['$scope', 'Contacts', '$ionicLoading', 'user', '$ionicNavBarDelegate', '$ionicHistory'];
    function ContactsListCtrl($scope, Contacts, $ionicLoading, user, $ionicNavBarDelegate, $ionicHistory) {

        $scope.data = {
            onError: false,
            onLoading: true,
            contacts: null
        };

        $ionicNavBarDelegate.showBackButton(true);
        console.log($ionicHistory.backView());
        setTimeout(function(){
            Contacts
                .fetchAll(user.id)
                .then(function(contacts){
                    $scope.data.contacts = contacts;
                })
                .catch(function(err){
                    $scope.data.onError = true;
                })
                .finally(function(){
                    $scope.data.onLoading = false;
                });
        }, 1500);

        $scope.doRefresh = function() {
            $scope.data.onError = false;
            setTimeout(function(){
                Contacts
                    .fetchAll(user.id)
                    .then(function(contacts){
                        $scope.data.contacts = contacts;
                    })
                    .catch(function(err){
                        $scope.data.onError = true;
                    })
                    .finally(function(){
                        $scope.data.onLoading = false;
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }, 1500);
        };

        $scope.goBack = function() {
            $ionicHistory.goBack();
        };
    }

    ContactsDetailCtrl.$inject = ['$scope', 'Contacts', '$ionicLoading', '$stateParams', 'user'];
    function ContactsDetailCtrl($scope, Contacts, $ionicLoading, $stateParams, user) {
        var id = $stateParams.id;

        $scope.data = {
            onError: false,
            onLoading: true,
            contact: null
        };

        Contacts
            .fetch(id)
            .then(function(contact){
                $scope.data.contact = contact;
            })
            .catch(function(err){
                $scope.data.onError = true;
            })
            .finally(function(){
                $scope.data.onLoading = false;
            });
    }

    ContactsGroupsCtrl.$inject = ['$scope', 'Events', '$ionicLoading', '$state', 'CONFIG'];
    function ContactsGroupsCtrl($scope, Contacts, $ionicLoading, $state, CONFIG) {
        console.log('salut');
    }

    ContactsGroupsDetailCtrl.$inject = ['$scope', 'Events', '$ionicLoading', '$state', 'CONFIG'];
    function ContactsGroupsDetailCtrl($scope, Contacts, $ionicLoading, $state, CONFIG) {
        console.log('ContactsGroupsCtrl');
        $scope.groups = [
            { name: 'Friends', id: 1 },
            { name: 'Family', id: 2 },
            { name: 'Coworkers', id: 3 },
            { name: 'Others', id: 4 },
        ];

        $scope.createGroup = function(){
            $state.go(CONFIG.state.contacts.groups.create);
        }
    }

    ContactsGroupsCreateCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
    function ContactsGroupsCreateCtrl($scope, Contacts, $ionicLoading, $state) {
        console.log('ContactsGroupsCreateCtrl');

        // Only called when group is valid
        $scope.createGroup = function(group){
            console.log(group);

        }

    }

})();