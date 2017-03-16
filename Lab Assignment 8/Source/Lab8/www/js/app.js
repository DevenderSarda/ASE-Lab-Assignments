// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var phoneBatteryLevel = '';
var phoneBatteryStatus ='';

var app = angular.module('app', ['ionic','ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope, $cordovaBatteryStatus) {

  document.addEventListener("deviceready", function () {

    $rootScope.$on('$cordovaBatteryStatus:status', function (result) {
      var batteryLevel = result.level;       // (0 - 100)
      var isPluggedIn  = result.isPlugged;   // bool
        phoneBatteryLevel = batteryLevel;
        phoneBatteryStatus = isPluggedIn;
    });

    $rootScope.$on('$cordovaBatteryStatus:critical', function (result) {
      var batteryLevel = result.level;       // (0 - 100)
      var isPluggedIn  = result.isPlugged;   // bool
         phoneBatteryLevel = batteryLevel;
        phoneBatteryStatus = isPluggedIn;
    });

    $rootScope.$on('$cordovaBatteryStatus:low', function (result) {
      var batteryLevel = result.level;       // (0 - 100)
      var isPluggedIn  = result.isPlugged;   // bool
         phoneBatteryLevel = batteryLevel;
        phoneBatteryStatus = isPluggedIn;
    });

  }, false);
});