var firebase = require('firebase');

// Initialize firebase

//Allows a user to signup
exports.signup = (req, res) => {
    if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    console.log(req.body)

    var email = req.body.email;
    var password = req.body.email;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Successfully registered User: " + user.email)
        res.status(200).send(user)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send(error);
    });
        
}

exports.signin = (req, res) => {
    if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    console.log(req.body)

    var email = req.body.email;
    var password = req.body.email;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Successfully registered User: " + user.email)
        res.status(200).send(user)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send(error)
    });
        
}