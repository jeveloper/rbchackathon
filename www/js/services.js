angular.module('starter.services', [])
.factory('Profile', function() {
  var profile = {steps: ["","","",""]};
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
    name: 'Serge',
   skills: "business banking, English, Pусский",
    face: 'img/serge.jpg'
  }, {
    id: 1,
    name: 'Stephen',
    skills: "mortgage, English, French",
    face: 'img/Stephen1.jpg'
  }, {
    id: 2,
    name: 'Syed',
     skills: "mortgage, business banking, English, Urdu",
    face: 'img/syed.jpg'
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



