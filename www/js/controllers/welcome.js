'use strict';

angular.module('starter.controllers')
    .controller('WelcomeCtrl', WelcomeCtrl);

WelcomeCtrl.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate', 'CONFIG', '$localStorage', 'STORAGE_KEYS', '$ionicHistory'];
function WelcomeCtrl($scope, $state, $ionicSlideBoxDelegate, CONFIG, $localStorage, STORAGE_KEYS, $ionicHistory) {

    $scope.data = {
        nbSlides: 2,
        slideIndex: 0,
        hideNextTime: $localStorage.get(STORAGE_KEYS.HIDE_WELCOME)
    };

    // Called to navigate to the main app
    $scope.startApp = function() {

        // save preference if user want to hide welcome screen
        $localStorage.set(STORAGE_KEYS.HIDE_WELCOME, $scope.data.hideNextTime);

        $ionicHistory.nextViewOptions({ disableBack: true });
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
    
    //$scope.onHideNextTimeChange = function(value){
    //    $localStorage.set(STORAGE_KEYS.HIDE_WELCOME, value);
    //}
}