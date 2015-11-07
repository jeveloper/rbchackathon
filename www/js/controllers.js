angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('OnboardingCtrl', function($scope, $state,$stateParams,Profile) {
  $scope.stepdone = function (stepnum, value){
    try{
      Profile.steps[stepnum] = value;
    }catch(e){}

    console.log(" step "+stepnum+" done"+ value);
    $scope.$broadcast('slideBox.nextSlide');
  }


  $scope.start = function(){
    return $state.go("tab.chats");
  }
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.v = {
    text:[],
    question: ""
  }
  $scope.ask = function(){
    if ($scope.v.question == "rep"){
      $scope.v.text.push({rep: true,q: $scope.v.question});

    }else{
      $scope.v.text.push({sender: true,q: $scope.v.question});
    }
    
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
