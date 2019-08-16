var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var tempDID;
var uCity;
var uKosher;
var uType;

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
    for (i = 0; i < 1; i++) {
        var event = events[i];
        console.log("event: " + event.message.text);
        if (event.message && event.message.text) {
            checking_status(event.sender.id, event.message.text);
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
        }
    }
    res.sendStatus(200);
});

function stam() {
    var refer = firebase.database().ref("dinner");
    return refer.once('value').then(function(snapshot) {
//        var aaa = snapshot.val()
//        console.log(aaa[0]);
          var aaa = refer.child('0/numba');
//          console.log('1: ' + aaa.val())
//          console.log('2: ' + aaa.val())
    });

};

function startCon(recipientId, text){
    sendMessage(recipientId, { text: "To start conversation please enter hello :)" });
}
function con0(recipientId, text){
    sendMessage(recipientId, { text: "Before we get started, lets get to know each other.\nPlease write the following information about yourself:\nfull name, phone number, languages." });
}
function updateName(info, refer){
    refer.update({fullName: info[0]});
}
function updatePhoneNumber(info, refer){
    refer.update({phoneNumber: info[1]});
}
function updateLanguages(info, refer){
    refer.update({languages: info[2]});
}
function con1(recipientId, text){
    var info = text.split(",");
    var refer = firebase.database().ref("users/" + recipientId);
    updateName(info, refer);
    updatePhoneNumber(info, refer);
    updateLanguages(info, refer);


//    refer.update({status: 1});
//
//    return refer.child(info[i]).once('value').then(function(snapshot) {}
//


    message = {
    "text": "Would you like to enter to a list of people whom helps Olim with daily problems such as go to see apartments with them or just talking with them?",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Yes",
        "payload":"<POSTBACK_PAYLOAD>"

      },{
        "content_type":"text",
        "title":"No",
        "payload":"<POSTBACK_PAYLOAD>"

      }
    ]
  }
    sendMessage(recipientId, message);
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function con2(recipientId, text){

//    var refer = firebase.database().ref("users/" + recipientId);
//    return refer.child('fullName').once('value').then(function(snapshot) {
//        var name  = snapshot.val()
        message = {
            "text": "Hello!!, please enter on the thing your searching for",
            "quick_replies":[{
                "content_type":"text",
                "title":"Host a dinner",
                "payload":"<POSTBACK_PAYLOAD>"
              },{
                "content_type":"text",
                "title":"Join a dinner",
                "payload":"<POSTBACK_PAYLOAD>"
              },{
                "content_type":"text",
                "title":"Create a pub gathering",
                "payload":"<POSTBACK_PAYLOAD>"
              },{
                "content_type":"text",
                "title":"Join a pub gathering",
                "payload":"<POSTBACK_PAYLOAD>"
              },{
                "content_type":"text",
                "title":"Join a soccer game",
                "payload":"<POSTBACK_PAYLOAD>"
              },{
                "content_type":"text",
                "title":"Just someone to talk to",
                "payload":"<POSTBACK_PAYLOAD>"
              },{
                "content_type":"text",
                "title":"Someone to go with to see apartments",
                "payload":"<POSTBACK_PAYLOAD>"
              }
            ]
          }

    sendMessage(recipientId, message);

}
function con31(recipientId, text){
    message = {
    "text": "witch kind of dinner you are going to make?",
    "quick_replies":[{
        "content_type":"text",
        "title":"Vegan",
        "payload":"<POSTBACK_PAYLOAD>"
      },{
        "content_type":"text",
        "title":"Vegetarian",
        "payload":"<POSTBACK_PAYLOAD>"
      },{
        "content_type":"text",
        "title":"None of them",
        "payload":"<POSTBACK_PAYLOAD>"
      }
    ]
  }
    sendMessage(recipientId, message);
}
function con311(recipientId, text){
    message = {
    "text": "Is the dinner kosher?",
    "quick_replies":[{
        "content_type":"text",
        "title":"Yes",
        "payload":"<POSTBACK_PAYLOAD>"
      },{
        "content_type":"text",
        "title":"No",
        "payload":"<POSTBACK_PAYLOAD>"
      }
    ]
  }
    sendMessage(recipientId, message);
}
function con32(recipientId, text){
    message = {
    "text": "are you a...",
    "quick_replies":[{
        "content_type":"text",
        "title":"Vegan",
        "payload":"<POSTBACK_PAYLOAD>"
      },{
        "content_type":"text",
        "title":"Vegetarian",
        "payload":"<POSTBACK_PAYLOAD>"
      },{
        "content_type":"text",
        "title":"None of them",
        "payload":"<POSTBACK_PAYLOAD>"
      }
    ]
  }
    sendMessage(recipientId, message);
}
function con321(recipientId, text){
    message = {
    "text": "Are you eating kosher?",
    "quick_replies":[{
        "content_type":"text",
        "title":"Yes",
        "payload":"<POSTBACK_PAYLOAD>"
      },{
        "content_type":"text",
        "title":"No",
        "payload":"<POSTBACK_PAYLOAD>"
      }
    ]
  }
    sendMessage(recipientId, message);
}
function con34(recipientId, text){
    sendMessage(recipientId, { text: "Please enter the city you live in" });
}
function con35(recipientId, text){
    sendMessage(recipientId, { text: "Please enter the city and street(format --> city, street)" });
}
function checking_status(recipientId, text){

    var refer = firebase.database().ref("users/" + recipientId);
    var referDinner = firebase.database().ref("dinner/" + recipientId);
    return refer.child('status').once('value').then(function(snapshot) {
        if (snapshot.val() == null){
        refer.set({
                "fullName": "Cars",
                "phoneNumber": "23",
                "languages": [],
                "age":20,
                "status": 0,
                "dinnerType": null,
                "kosher": null,
                "city": null
              });
              startCon(recipientId, text);


    }else{
        //var status = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log("asd: " + snapshot.val());
//        refer.update({status: 1});
        var status = snapshot.val();
        switch(status){
                    case 0:
                        con0(recipientId, text);
                        refer.update({status: 1});
                        break;
                    case 1:
                        con1(recipientId, text);
                        refer.update({status: 2});

                        break;
                    case 2:
                        if(text == "Yes"){
                            refer.update({status: 3});
                        }else{

                        }
                    case 3:
                        con2(recipientId, text);
                        refer.update({status: 33});
                        break;
                    case 33:
                        console.log("case 33");
                        if (text == "Host a dinner"){
                        refer.update({status: 31});
                        return referDinner.child('DID').once('value').then(function(snapshotDin) {
                            if (snapshotDin.val() == null){
                            referDinner.set({
                                    "DID": "Cars",
                                    "userID": "23",
                                    "languages": [],
                                    "dinnerType":20,
                                    "kosher": null,
                                    "city": 0,
                                    "street": 0
                                  });
                             }
                             referDinner.update({DID: recipientId});
                             checking_status(recipientId, text);
                         });
                        }else if(text == "Join a dinner"){
                             refer.update({status: 32});
                             checking_status(recipientId, text);
                        }
                        break;

                    case 31:
                        con31(recipientId, text);
                        refer.update({status: 311});
                        break;
                    case 311:
                        referDinner.update({dinnerType: text});
                        con311(recipientId, text);
                        refer.update({status: 35});
                        break;
                    case 32:
                        con32(recipientId, text);
                        refer.update({status: 321});
                        break;
                    case 321:
                        refer.update({dinnerType: text});
                        con321(recipientId, text);
                        refer.update({status: 34});
                        break;
                    case 34:
                        refer.update({kosher: text});
                        con34(recipientId, text);
                        refer.update({status: 200});
                        break;
                    case 35:
                        referDinner.update({kosher: text});
                        con35(recipientId, text);
                        refer.update({status: 100});
                        break;
                    case 100:
                        var live = text.split(",");
                        referDinner.update({city: live[0]});
                        referDinner.update({street: live[1]});
                        sendMessage(recipientId, { text: "Thank you for helping the olim. the olim will contact you :)" });
                        break;
                    case 200:
                        refer.update({city: text});
                         return referDinner.child('DID').once('value').then(function(snapshotDin) {
                         tempDID = snapshotDin.val();
//                         console.log(tempDID)
//                         sendMessage(recipientId, { text: tempDID });
                             return referDinner.child('city').once('value').then(function(snapshotDin) {
                             uCity = snapshotDin.val();
                                 return referDinner.child('dinnerType').once('value').then(function(snapshotDin) {
                                 uType = snapshotDin.val();
                                     return referDinner.child('kosher').once('value').then(function(snapshotDin) {
                                     uKosher = snapshotDin.val();
                                     });
                                 });
                             });
                         });
                         refer.update({status: 300});
//                        dinnerAlgo(refer, uCity, uKosher, uType)
                        break;
                    case 300:
                        sendMessage(recipientId, { text: "We hope you will find someone nice to eat with :D" });
                        sendMessage(recipientId, { text: tempDID});
                        sendMessage(recipientId, { text: uCity});
                        sendMessage(recipientId, { text: uType});
                        sendMessage(recipientId, { text: uKosher});
                        break;
                    default:
                        break;
                }
                }

        });

}


function testing2(phone_number) {
    console.log("userref: " + phone_number)
};

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
    //// Send HTTP request to Azure Functions ////
//    var theurl = 'https://olim-hackathon.firebaseio.com/'
//    const request = require('request');
//    request('https://poop2.azurewebsites.net/api/HttpTrigger1?code=CetbtwE9KeFOwaOtLtVUpSi6QiJGFFspjWwnbIOrL5SObgE5agWQQA==&name=young', function (error, response, body) {
//      console.error('error:', error); // Print the error if one occurred
//      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//      console.log('body:', body); // Print the HTML for the Google homepage.
//      // 1
//      sendMessage(recipientId, { text: body });
//      sendMessage(recipientId, { text: "POOP" });
//    });
    //// Write Data to Firebase
//    var rootRef = firebase.database().ref();
//    var storesRef = rootRef.child('app/cars');
//    var newStoreRef = storesRef.push();
//      newStoreRef.set({
//        name: "Cars",
//        "pageId": "23",
//        "storeURL": "/app/cars/gallery"
//      });

    var ref = firebase.database().ref("users/" + recipientId);
    ref.on("value", function(snapshot) {
       console.log(snapshot.val());

       console.log(text + " " +recipientId)///////////testing

       if (snapshot.val() == null) { // New User //
          ref.set({
            name: "Cars",
            "pageId": "23",
            "storeURL": "/app/cars/gallery"
          });
       }
    }, function (error) {
       console.log("Error: " + error.code);
    });



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
function dinnerAlgo(UID, uCity, uKosher, uType){
    var matches = [];
    var allUsers = firebase.database().ref("users");
    return allUsers.child(UID + 'languages').once('value').then(function(snapshotLang) {
        var uLanguages = snapshotLang.val();                                                //array
            var dinnerRefer = firebase.database().ref("dinner");
            return dinnerRefer.once('value').then(function(snapshot1) {
                var dinner = snapshot1.val();
                var DID;
                for(DID = 0; DID < dinner.length; DID++){
                    return dinnerRefer.child(dinner[DID] + '/city').once('value').then(function(snapshotCity) {
                        if(snapshotCity.val() != uCity){
                            break;
                        }
                        return dinnerRefer.child(dinner[DID] + '/userID').once('value').then(function(snapshotHostID) {
                            var hostID = snapshotHostID.val();
                            return allUsers.child(hostID + 'languages').once('value').then(function(snapshotHostLang) {
                                var hLanguages = snapshotHostLang.val();
                                var i;
                                var j;
                                var langCounter = 0;
                                for(i=0; i<hLanguages.length; i++){
                                    for(j=0; j<uLanguages.length; j++){
                                        if(hLanguages[i] == uLanguages[j]){
                                            langCounter++;
                                            break;
                                        }
                                    }
                                    if(langCounter != 0){
                                        break;
                                    }
                                }
                                return dinnerRefer.child(dinner[DID] + '/dinnerType').once('value').then(function(snapshotType) {
                                    if(uType != snapshotType.val()){
                                        break;
                                    }
                                    return dinnerRefer.child(dinner[DID] + '/kosher').once('value').then(function(snapshotKosher){
                                        if(snapshotKosher.val() != uKosher){
                                            break;
                                        }
                                        matches.push(hostID);
                                        finalList(matches,'2880995941916076');
                                    });
                                });
                            });
                        });


                    });
                }
            });


    });
};


function finalList(arr, recipientId) {
    // var dict = [{"name": "eli", "phone number": "052"}];
    var theList = [];
    var usersRef = firebase.database().ref("users");
    var i;
    for (i = 0; i < arr.length; i++) {
        var name;
        var phoneNumber;
        return refer.child(arr[i] + '/fullName').once('value').then(function(snapshotName) {
            name = snapshotName.val();
            return refer.child(arr[i] + '/phoneNumber').once('value').then(function(snapshotPN) {
                phoneNumber = snapshotPN.val();
                theList.push({'name': name, 'phoneNumber': phoneNumber});
                if (i == arr.length-1) {
                    showList(theList, recipientId);
                }
            });
        });
    }
};

function showList(arr, recipientId) {
    var i;
    for (i = 0; i < arr.length; arr++) {
        sendMessage(recipientId, { text: "Name: " + arr[i][0] + "and the Phone Number: " + arr[i][1] });
        // sendMessage(recipientId, { text: "Phone Number: " + arr[i][1] });
    }
};