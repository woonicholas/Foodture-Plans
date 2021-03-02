const firebase = require('firebase');

//Allows a user to signup
exports.signup = (req, res, next) => {
    console.log(req.body)
    if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    var email = req.body.email;
    var password = req.body.email;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Successfully registered User: " + user.email)
        await fs.collection('users').doc(user.uid).set({
            email: user.email,
            uid: user.uid
        });
        console.log("Successfully added uid to firestore: " + user.uid)
        res.status(200).send(user)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send(error);
    });
        
}

exports.signin = (req, res, next) => {
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
        console.log("Successfully signed in User: " + user.email)
        res.status(200).send(user)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send(error)
    });
        
}