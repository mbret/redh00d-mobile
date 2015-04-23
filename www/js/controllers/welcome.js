'use strict';

angular.module('starter.controllers')
    .controller('WelcomeCtrl', WelcomeCtrl);

WelcomeCtrl.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate', 'CONFIG', '$localStorage', 'STORAGE_KEYS'];
function WelcomeCtrl($scope, $state, $ionicSlideBoxDelegate, CONFIG, $localStorage, STORAGE_KEYS) {

    $scope.nbSlides = 2;
    $scope.slideIndex = 0;
    $scope.hideNextTime = $localStorage.get(STORAGE_KEYS.HIDE_WELCOME);
    
    // Called to navigate to the main app
    $scope.startApp = function() {
        $state.go(CONFIG.state.home);
    };
    
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.onSlideChange = function(index) {
        $scope.slideIndex = index;
    };
    
    $scope.onHideNextTimeChange = function(value){
        $localStorage.set(STORAGE_KEYS.HIDE_WELCOME, value);
    }
}