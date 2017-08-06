var admin = require("firebase-admin");

var serviceAccount = require("./credentials/arkraiders-23f7f-firebase-adminsdk-exe13-bd5e6898cb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arkraiders-23f7f.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = "fAAdG1ima6Y:APA91bFCEZCf9teiURJklfdesWSS1Ghm5XINciKZ76qoIjWryBIV0cLhNKWDc4RzVFFuUWzye-y0nO8Jfhn-p1uf_oPN-66innFvUUGp0TmgSX1wpPE9H4I81-BNl6eHAY6HYTcWLYLY";

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  notification: {
    title: "$GOOG up 1.43% on the day",
    body: "$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day."
  },
  data: {
    stock: "GOOG",
    open: 829.62,
    close: "635.67"
  }
};


// Send a message to the device corresponding to the provided
// registration token.
admin.messaging()
.sendToDevice(registrationToken, payload)
.then(function(response) {
  // See the MessagingDevicesResponse reference documentation for
  // the contents of response.
  console.log("Successfully sent message:", response);
})
.catch(function(error) {
  console.log("Error sending message:", error);
});
