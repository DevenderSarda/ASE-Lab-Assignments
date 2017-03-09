angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu.search', {
    url: '/search',
    views: {
      'main': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('menu.myMusic', {
    url: '/mymusic',
    views: {
      'main': {
        templateUrl: 'templates/myMusic.html',
        controller: 'myMusicCtrl'
      }
    }
  })

  .state('menu.explore', {
    url: '/explore',
    views: {
      'main': {
        templateUrl: 'templates/explore.html',
        controller: 'exploreCtrl'
      }
    }
  })

  .state('menu', {
    url: '/main',
    templateUrl: 'templates/menu.html',
    abstract:true
  })
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

//$urlRouterProvider.otherwise('/main/search')
  
  $urlRouterProvider.otherwise('/login')



});
