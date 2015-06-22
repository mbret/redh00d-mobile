(function(){
    'use strict';

    angular.module('starter.controllers')
        .controller('ContactsCtrl', ContactsCtrl)
        .controller('ContactsListCtrl', ContactsListCtrl)
        .controller('ContactsDetailCtrl', ContactsDetailCtrl)
        .controller('ContactsGroupsCtrl', ContactsGroupsCtrl);

    ContactsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
    function ContactsCtrl($scope, Contacts, $ionicLoading) {

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
                .fetchAll()
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
                    .fetchAll()
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
            }, 150000);
        };

        $scope.goBack = function() {
            $ionicHistory.goBack();
        };
    }

    ContactsDetailCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
    function ContactsDetailCtrl($scope, Contacts, $ionicLoading) {


    }

    ContactsGroupsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
    function ContactsGroupsCtrl($scope, Contacts, $ionicLoading) {
        console.log('ContactsGroupsCtrl');
        $scope.groups = [
            { name: 'Friends', id: 1 },
            { name: 'Family', id: 2 },
            { name: 'Coworkers', id: 3 },
            { name: 'Others', id: 4 },
        ]

    }
})();