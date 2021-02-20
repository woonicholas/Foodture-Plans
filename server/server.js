const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const firebase = require('firebase');
const routes = require('./routes');


const firebaseConfig = {
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

global.fs = firebase.firestore();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json()) // with this you can send the data to api in json format

//  Connect all our routes to our application
app.use('/',routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


//     const app = express();
//     //parse requests of content-type - application/x-www-form-urlencoded
//     app.use(bodyParser.urlencoded({ extended: true}))
//     // parse requests of content-type: application/json
//     app.use(bodyParser.json())
//     app.use(cors())

//     app.get('/test', (req, res) => {
//         console.info("Testing Web Server.. Welcome!")
//         res.json({"message": "welcome"})
//     });

//     require('./app/routes.js')(app);
//     app.listen(3001, () => {
//         console.log("Server is listening on port 3001");
//     });
// }
// run();