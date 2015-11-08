angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope,$state, Chats,livechat) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});



  $scope.makechat = function (repname){
      
       $state.go('tab.chat-detail',{chatId: 12333});
    
  }

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


.controller('ChatDetailCtrl', function($scope, $stateParams, livechat) {
  

  
  $scope.v = {
    messages: livechat.roomcontent($stateParams.chatId),
    question: ""
  }
  $scope.ask = function(){

    var chatMessage = {
      is_customer: true,
      message: $scope.v.question,
      createdAt: Firebase.ServerValue.TIMESTAMP
    };


    if ($scope.v.question == "rep"){
      chatMessage.is_customer = false;
      
    }else{
     
    }
    $scope.v.messages.$add(chatMessage);
    
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
