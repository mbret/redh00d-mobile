'use strict';

angular.module('starter.controllers')
    .controller('ContactsCtrl', ContactsCtrl)
    .controller('ContactsListCtrl', ContactsListCtrl)
    .controller('ContactsGroupsCtrl', ContactsGroupsCtrl);

ContactsCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
function ContactsCtrl($scope, Contacts, $ionicLoading) {


}

ContactsListCtrl.$inject = ['$scope', 'Events', '$ionicLoading'];
function ContactsListCtrl($scope, Contacts, $ionicLoading) {

    $scope.contacts = Contacts.fetchAll();

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