var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

///////////////// FIREBASE /////////////////
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

var firebaseConfig = {
      apiKey: "AIzaSyBcoDUQKu8hlGNj-Ig4Dp_I0Fae4dFEBJA",
      authDomain: "olim-hackathon.firebaseapp.com",
      databaseURL: "https://olim-hackathon.firebaseio.com",
      projectId: "olim-hackathon",
      storageBucket: "olim-hackathon.appspot.com",
      messagingSenderId: "1079712175702",
      appId: "1:1079712175702:web:5b3ce2f95f80150f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
///////////////// FIREBASE /////////////////

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function(req, res) {
    res.send('This is TestBot Server');
});

// Facebook Webhook
app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// handler receiving messages
app.post('/webhook', function(req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            testing(event.sender.id, event.message.text);
//            if (!kittenMessage(event.sender.id, event.message.text)) {
//               sendMessage(event.sender.id, { text: "Echo: " + event.message.text });
//            }
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
        }
    }
    res.sendStatus(200);
});


// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: recipientId },
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

function testing(recipientId, text) {

    //  'https://poop2.azurewebsites.net/api/HttpTrigger1?code=CetbtwE9KeFOwaOtLtVUpSi6QiJGFFspjWwnbIOrL5SObgE5agWQQA==&name=young'
//    var theurl = 'https://olim-hackathon.firebaseio.com/'
    const request = require('request');
    request('https://poop2.azurewebsites.net/api/HttpTrigger1?code=CetbtwE9KeFOwaOtLtVUpSi6QiJGFFspjWwnbIOrL5SObgE5agWQQA==&name=young', function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      // 1
      sendMessage(recipientId, { text: body });
      sendMessage(recipientId, { text: "POOP" });
    });

    var database = firebase.database().ref("Dinner/Hi");
    var rootRef = database.child('graduate')
    console.log(starCountRef)
};

// send rich message with kitten
function kittenMessage(recipientId, text) {

    text = text || "";
    var values = text.split(' ');

    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {

            var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);

            message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Kitten",
                            "subtitle": "Cute kitten picture",
                            "image_url": imageUrl,
                            "buttons": [{
                                "type": "web_url",
                                "url": imageUrl,
                                "title": "Show kitten"
                            }, {
                                "type": "postback",
                                "title": "I like this",
                                "payload": "User " + recipientId + " likes kitten " + imageUrl,
                            }]
                        }]
                    }
                }
            };

            sendMessage(recipientId, message);

            return true;
        }
    }
    message = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "hello mr, how can i hep you?\n you can choose between a friday dinner and a social meeting:  ",
                    "buttons": [{
                        "type": "postback",
                        "title": "friday dinner",
                        "payload": "User " + recipientId + " likes kitten ",
                    }, {
                        "type": "postback",
                        "title": "social meeting",
                        "payload": "User " + recipientId + " likes kitten ",
                    }]
                }]
            }
        }
    };

    sendMessage(recipientId, message);

    return true;

    return false;

};