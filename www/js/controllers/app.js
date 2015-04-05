'use strict';

angular.module('starter.controllers')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $ionicModal, $timeout, $rootScope, user, $ionicLoading) {

    // Form data for the login modal
    //$scope.loginData = {};
    //
    //// Create the login modal that we will use later
    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //    scope: $scope
    //}).then(function(modal) {
    //    $scope.modal = modal;
    //});
    //

    //// Open the login modal
    //$scope.login = function() {
    //    $scope.modal.show();
    //};

    $scope.$on('$stateChangeSuccess', function () {
        console.log('dsf');
        $ionicLoading.hide();
    });
}