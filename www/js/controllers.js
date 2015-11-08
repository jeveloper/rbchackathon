angular.module('starter.controllers', ['firebase'])


.controller('ChatsCtrl', function($scope,$ionicHistory,$interval, $rootScope, $state, Chats,livechat, Profile) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


$scope.makechat = function (repnum,repname){
  $rootScope.$broadcast("app.addmessage",{is_customer: false, message: "Hi, I'm  "+repname+", How can i Help?"});
  $rootScope.$broadcast("app.addmessage",{is_customer: true, message: "Hi I'm Serge Bornow , looking for "+Profile.steps[2] + " in "+Profile.steps[3] });
  
  $interval(function(done){
   $ionicHistory.nextViewOptions({
    disableBack: true
  });

   $state.go('tab.chat-detail',{chatId:repnum });

 },500)

}


  $scope.$on('$ionicView.enter', function(e) {
    
    var matched = Chats.all();

    if (Profile.steps[1] != 'skip'){
     matched = _.filter(matched,function(rep){
      return rep.skills.includes(Profile.steps[1]); 

    });
   }

   if (Profile.steps[2] != 'skip'){
     matched = _.filter(Chats.all(),function(rep){
      return rep.skills.includes(Profile.steps[2]); 
    });
   }

   $scope.chats = matched;
 });



})

.controller('OnboardingCtrl', function($scope, $state,$stateParams,Profile) {
  $scope.stepdone = function (stepnum, value){
    try{
      Profile.steps[stepnum] = value;
    }catch(e){}

    
    $scope.$broadcast('slideBox.nextSlide');
  }


  $scope.start = function(){
    return $state.go("tab.chats");
  }
})


.controller('ChatDetailCtrl', function($scope, $http,$ionicPopup,$rootScope,Profile,$ionicLoading,$ionicScrollDelegate, $stateParams, livechat) {
 $ionicScrollDelegate.scrollBottom();

 $scope.showAlert = function(msg) {
   var alertPopup = $ionicPopup.alert({
     title: 'Hey',
     template: msg
   });
   alertPopup.then(function(res) {
     console.log('done');
   });
 }

 $scope.v = {
  messages: livechat.roomcontent($stateParams.chatId),
  question: ""
};

$scope.show = function() {
  $ionicLoading.show({
    template: 'Loading...'
  });
};
$scope.hide = function(){
  $ionicLoading.hide();
};

$scope.hangup = function(){

  Twilio.Device.disconnectAll();
}


$scope.makecall = function(){
  $scope.show();
  $http.get('https://rbcboomer.azurewebsites.net/twilio/token').success(function (token) {
    $scope.hide();
    console.log("YAY GOT TOKEN");
    console.log(token);


    Twilio.Device.setup(token, { debug: true, rtc: true });

    Twilio.Device.ready(function(device) {
        // The device is now ready
        console.log("Twilio.Device is now ready for connections");

        var connection = Twilio.Device.connect({agent: 'rep'});
      });
  });
}
$scope.takecall = function(){
  $scope.show();

  $http.get('https://rbcboomer.azurewebsites.net/twilio/token/rep').success(function (token) {
    $scope.hide();
    console.log("YAY GOT TOKEN");
    console.log(token);


    Twilio.Device.setup(token, { debug: true, rtc: true });

    Twilio.Device.ready(function(device) {
        // The device is now ready
        console.log("Twilio.Device is now ready for connections");
        Twilio.Device.incoming(function(connection) {
          connection.accept();
          $scope.showAlert("Accepted a call!");
          console.log("INCOMING CALL!!!");
          console.log(connection.parameters);
        });
      });

    
               //Twilio.Device.setup(token); // Setup our Twilio device with the token.
    }); // Note: Should do error checking here.

// Twilio.Device.ready(function(device) {
//   // The device is now ready
//   console.log("Twilio.Device is now ready for connections");
// });


}

$rootScope.$on('app.addmessage', function(e,message) {

  $scope.v.messages.$add(message);
});

$scope.v.messages.$watch(function(e) {
  if (e.event === 'child_added'){
    $ionicScrollDelegate.scrollBottom(true);
  }
});


$scope.ask = function(){

  var chatMessage = {
    is_customer: true,
    message: $scope.v.question,
    createdAt: Firebase.ServerValue.TIMESTAMP
  };
  console.log(Profile);

  if (Profile.isrep == true){
    chatMessage.is_customer = false;

  }
  $scope.v.messages.$add(chatMessage);

  $scope.v.question = "";
  $ionicScrollDelegate.scrollBottom(true);


}
})

.controller('AccountCtrl', function($scope,Profile) {
  $scope.settings = {
    iamrep: Profile.isrep || false
  };

  $scope.change = function(){

    Profile.isrep = $scope.settings.iamrep;
  }
});
