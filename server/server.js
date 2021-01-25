const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var firebase = require('firebase');

// Initialize firebase

var firebaseConfig = {
    apiKey: "AIzaSyBV86RyU0v3ZCpuXKkzj-X-9ahMkJWjJK8",
    authDomain: "foodture-33d9e.firebaseapp.com",
    projectId: "foodture-33d9e",
    storageBucket: "foodture-33d9e.appspot.com",
    messagingSenderId: "718458629140",
    appId: "1:718458629140:web:cc4f3b08fbe13598ce8b01",
    measurementId: "G-BSFLGTEVEZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function run() {

    const app = express();
    //parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true}))
    // parse requests of content-type: application/json
    app.use(bodyParser.json())
    app.use(cors())

    app.get('/', (req, res) => {
        console.info("Testing Web Server.. Welcome!")
        res.json({"message": "welcome"})
    });

    require('./app/routes.js')(app);
    app.listen(3001, () => {
        console.log("Server is listening on port 3001");
    });
}
run();