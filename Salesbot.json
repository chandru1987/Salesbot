const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://salesbot-rq9f-default-rtdb.asia-southeast1.firebasedatabase.app/'
    });
// create instance of seviceAccount with private key
// initialize firebase admin with serviceAccount
const app = admin.initializeApp();
db = admin.database();
app.get("/", function (req, res) {
  res.send("Hello How May I Help You?..."); //write a response to the client
});

function Lms_price(parameters) {
  // code to return data
  const message = "How expensive is the Lms?";
  return {
    fulfillmentMessages: [
      {
        text: {
          text: [message]
        }
      }
    ]
  };
}

let intentMap = new Map();
intentMap.set("who am i", whoAmI);
// intentMap.set('intent name', function);

app.post("/agent", function (req, res) {
  // here is my firebase fulfilment codes
  const body = req.body;
  const intent = body.queryResult.intent.displayName;
  const parameters = body.queryResult.parameters;

  const intentHandler = intentMap.get(intent);
  res.send(intentHandler(parameters));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("server running on " + port);
});
