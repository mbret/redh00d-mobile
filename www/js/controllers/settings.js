'use strict';

angular.module('starter.controllers')
    .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$scope', 'Events', '$ionicLoading', '$ionicHistory', '$localStorage', 'APP_CONFIG'];
function SettingsCtrl($scope, Events, $ionicLoading, $ionicHistory, $localStorage, APP_CONFIG) {
    
    $scope.settings = {
        setting_1: APP_CONFIG.setting_1
    };
    
    $scope.$watch('settings.setting_1', function(newValue, oldValue){
        save('setting_1', newValue);
    });
    
    function save(settingKey, newValue){
        APP_CONFIG[settingKey] = newValue;
        $localStorage.setObject('settings', APP_CONFIG);
    }

}