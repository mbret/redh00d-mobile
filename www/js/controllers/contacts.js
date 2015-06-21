'use strict';

angular.module('starter.controllers')
    .controller('ContactsCtrl', ContactsCtrl)
    .controller('ContactsListCtrl', ContactsListCtrl)
    .controller('ContactsDetailCtrl', ContactsDetailCtrl)
    .controller('ContactsGroupsCtrl', ContactsGroupsCtrl);

ContactsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
function ContactsCtrl($scope, Contacts, $ionicLoading) {

}

ContactsListCtrl.$inject = ['$scope', 'Contacts', '$ionicLoading'];
function ContactsListCtrl($scope, Contacts, $ionicLoading) {

    $scope.contacts = Contacts.fetchAll();

}

ContactsDetailCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
function ContactsDetailCtrl($scope, Contacts, $ionicLoading) {


}

ContactsGroupsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
function ContactsGroupsCtrl($scope, Contacts, $ionicLoading) {

    $scope.groups = [
        { name: 'Friends', id: 1 },
        { name: 'Family', id: 2 },
        { name: 'Coworkers', id: 3 },
        { name: 'Others', id: 4 },
    ]

}