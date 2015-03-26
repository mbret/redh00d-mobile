'use strict';

angular.module('starter.controllers')
    .controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($scope, $rootScope, $timeout, user, $state, $ionicLoading, $ionicPopup, AuthenticationService) {

    $scope.data = {};

    $scope.doRegister = function() {

        $state.go('app.events');

    };
    
}