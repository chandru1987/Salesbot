const express = require('express')
const admin = require('firebase-admin');

var serviceAccount = require("/path/to/privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "your firebase realtime database url"
});

const db = admin.database();
const ref = db.ref('mysecret')

ref.on('value', (snapshot) => {
  console.log(snapshot.val());
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
}); 

const app = express()
app.use(express.json());

const port = 3000

function handleRoot(req, res) {
  res.send('Hello World!')
}

function handleHello(req, res) {
  res.send('Hello back')
}

function handleSave(req, res) {
  const value = req.params.value
  const refSave = db.ref("save")
  refSave.set(value)
  res.status(200).send()
}

function handleAppointment(req, res) {
  const appointment = req.body;
  const refAppointment = db.ref("appointments")
  const newAppointmentRef = refAppointment.push()
  newAppointmentRef.set(appointment)
  res.status(200).send()
}

function handleDialog(req, res) {
  // if intent is make-appointment, save appointment to firebase
  const body = req.body;
  const intent = body.queryResult.intent.displayName;

  if (intent === "make-appointment") {
    const parameters = body.queryResult.parameters;
    const appointment_datetime = parameters["appointment-datetime"].date_time;    
    const name = parameters["name"];
    const clinic = parameters["clinic"];

    const refAppointment = db.ref("appointments")
    const newAppointmentRef = refAppointment.push()
    newAppointmentRef.set({
      name: name,
      clinic: clinic,
      appointment_datetime: appointment_datetime
    })
    res.status(200).send()    
  }
}

app.get('/', handleRoot)
app.get('/hello', handleHello)
// e.g /save/100, /save/999
app.get('/save/:value', handleSave)
app.post('/appointment', handleAppointment)
app.post('/dialog', handleDialog)

/*
  appointment: {
    first_name: "",
    last_name: "",
    phone: "",
    time: "",
    clinic: ""
  }
*/

// PRACTICE ON YOUR OWN

// Create a function to handle to retrieve appointment details using an appointment id 
// * hint: use a app.get()

// Create a function to handle removing an appointment based on the appointment id
// * hint: use a app.delete()

// Create a function to handle updating an appointment record

function start() {
  console.log(`Example app listening at http://localhost:${port}`)
}

app.listen(port, start)