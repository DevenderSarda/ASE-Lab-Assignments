angular.module('app.controllers', [])

.controller('searchCtrl', function($scope, $http, $q, $ionicLoading) {

  $scope.videos = [];
    
    $scope.data={
        query: ''
    };

  $scope.youtubeParams = {
    key: 'AIzaSyA8tuvkSJPIKBTk2ryX6z2PugU1I3Iavfw',
    type: 'video',
    maxResults: '50',
    part: 'id,snippet',
    q: '',
    order: 'relevance'
  }

  $scope.getVideos = function(query) {
        var speakup = "Fetching top 50 relevant videos in web for "+query;
        console.log(speakup);
        var msg = new SpeechSynthesisUtterance(speakup);
        window.speechSynthesis.speak(msg);  
      
    $ionicLoading.show({
      template: '<p>Loading ' + query + '...</p><ion-spinner></ion-spinner>'
    });
    $scope.youtubeParams.q = query;
    $scope.videos = [];
    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.videos.push(child);
      });
      $q.all($scope.videos).then(function () {
        console.log($scope.videos);
        $ionicLoading.hide();
      });
    });
  };
    
    
  $scope.getVideosOnClick = function() {
        var speakup = "Fetching top 50 relevant videos in web for "+$scope.data.query;
        console.log(speakup);
        var msg = new SpeechSynthesisUtterance(speakup);
        window.speechSynthesis.speak(msg);  
      
    $ionicLoading.show({
      template: '<p>Loading ' + $scope.data.query + '...</p><ion-spinner></ion-spinner>'
    });
    $scope.youtubeParams.q = $scope.data.query;
    $scope.videos = [];
    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.videos.push(child);
      });
      $q.all($scope.videos).then(function () {
        console.log($scope.videos);
        $ionicLoading.hide();
      });
    });
  };
    
   

})

.controller('myMusicCtrl', function($scope) {
})

.controller('exploreCtrl', function($scope) {

})

  
.controller('loginCtrl', function($scope, $rootScope, $state) {

  	$scope.login = function() {
  		
  		console.info('Authentication...');
        
  		alert('Logged In');
        $state.go('menu.search');
  	}
    
    $scope.fbLogin = function(){
      alert("Logged in with facebook");
        $state.go('profile');
    };
    
    $scope.goToRegister = function(){
        $state.go('register');
    };
	
})
   
.controller('registerCtrl', function($scope) {

    $scope.goToLogin = function(){
        $state.go('login')
    };
    
})
