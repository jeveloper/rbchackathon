angular.module('starter.services', [])
.factory('Profile', function() {
  var profile = {};
  //simple temp store of persons profile data
  return profile;
})



.factory('livechat',  function($firebaseArray, $q) {

//todo move the url out of here
var frurl = 'https://rbchack.firebaseIO.com/conversations/';


return {


 remove: function (chat) {
  //TODO
    // chats.$remove(chat).then(function (ref) {
    //         ref.key() === chat.$id; // true item has been removed
    //     });
  },
 roomcontent: function(_roomid){
  

    //get back array
    var ref = new Firebase(frurl+_roomid);
    return $firebaseArray(ref);
  }
 

  
}

})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});



