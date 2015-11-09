# Bincu -  better interaction with customers
### A product of 2015 RBC Hackathon , 36 hours, 45 minutes of sleep
=====================


### Simplicity, Creativity, Impact 

- Everyone is familiar with a chat app, few questions to identify the best Advisor and you're ready to chat
- Call center operations will become more effecient (think chatting with a few customers at once)
- I spent a good chunk of the night to integrate VoiP (voice over ip) to offer direct communication - tech issues caused me to drop it


### Tech stuff

- Built with Ionic framework, cordova, javascript, angularJS , small API server with NodeJS 
- Using firebase for real time communication between an Advisor user and customer
- Call button may attempt to dial RBC phone number, beware
- Simple filtering by languages or/and topic of customer and matching advisor
- replace firebase url with your own, rbchack.firebaseIO.com will be removed after hackathon

* Running on a Device:

### IOS
- ionic run ios --device
- ios-deploy --bundle <location>

### Android

- ionic run android



#### API Server to generate token for security reasons , for Audio/Video communication


API Server (i deployed it on MS Azure with continous deployment setup)

```
var express = require("express"), // Include express.
    twilio = require("twilio"); // Include twilio.

var app = express(); // Initialize express.
var cors = require('cors');

app.use(cors());


// Get a Twilio capability token.
app.get("/twilio/token", function (req, res) {

  var capability = new twilio.Capability( // Create a Twilio capability token.
    'TWI KEY',
    'AUTH'
  );

  // Set the capability token to allow the client to make outbound calls.
  capability.allowClientOutgoing('APP ID');
  capability.allowClientIncoming('rep');

  // Send the token to the client.
  res.send(capability.generate());
});

app.get("/status", function (req, res){
  res.send("OK");
});

// Fire up the server and start listening!
app.listen(process.env.PORT || 3000, function () {
  console.dir("Express server started on port 3000.");
});
```

### Screenshots

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/desktop.png "Desktop (think advisor)")

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/1.png "Welcome")

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/2.png "Aboriginal Language In Canada and others")

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/3.png "Topics to narrow down to ")

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/4.png "What if Advisor can derect you to nearest location")

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/5.png "Speak to qualified advisor")

![Alt text](https://github.com/jeveloper/rbchackathon/screenshots/6.png "Real time chat")



