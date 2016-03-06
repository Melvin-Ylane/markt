// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

      $cordovaPlugin.someFunction().then(success, error);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("HomeCtrl",function($scope, $state, $ionicPopup){
  
})

.controller("MainCtrl",function($scope, $state, $ionicPopup,$cordovaGeolocation,$sce){

  $scope.me = {lat:null,long:null};
  $scope.struct = {lat:5.403871,long:-3.9877217};



  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.long - p1.long);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.me.lat  = position.coords.latitude;
      $scope.me.long = position.coords.longitude;

      $scope.posi = parseInt(getDistance($scope.me,$scope.struct));

      console.log();
    }, function(err) {
      // error
    });
})

.controller("DetailsCtrl",function($scope, $state, $ionicPopup,$cordovaGeolocation,$sce){

  $scope.me = {lat:null,long:null};

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.me.lat  = position.coords.latitude;
      $scope.me.long = position.coords.longitude;

      $scope.url = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/directions?key=AIzaSyCaBIrEeFycDARd_nSXoyA2KI-9Pxskwxk&origin="+$scope.me.lat+","+$scope.me.long+"&destination=5.403871,-3.9877217&zoom=13");
    }, function(err) {
      // error
    });

    $("#owl-galery").owlCarousel({
      slideSpeed : 400,
      autoPlay : 4000,
      itemsDesktop: false,
      itemsDesktopSmall: false,
      itemsTablet: false,
      itemsTabletSmall: false,
      itemsMobile: false,
      autoHeight : true,
      items:1,
      stopOnHover : true,
      navigation : false,
      pagination : true,
    });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('home',{
    url:'/home',
    templateUrl:'templates/home.html',
    controller:'HomeCtrl'
  })

  $stateProvider.state('main',{
    url:'/main',
    templateUrl:'templates/main.html',
    abstract:true,
    controller:'MainCtrl'
  })

  $stateProvider.state('details',{
    url:'/details',
    templateUrl:'templates/details.html',
    controller:'DetailsCtrl'
  })

  $stateProvider.state('main.pro',{
    url:'/pro',
    views:{
      pro:{
        templateUrl:'templates/pro.html'
      }
    }
  })

  $stateProvider.state('main.part',{
    url:'/particulier',
    views:{
      particulier:{
        templateUrl:'templates/particulier.html'
      }
    }
  })

  $urlRouterProvider.otherwise('/home')
})
