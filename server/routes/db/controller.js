const firebase = require('firebase');
const models = require('./models.js')
const utils = require('../../utils/utils.js')

exports.getUser = async (req, res, next) => {
    if(!req.params) {
        return res.status(400).send(({
            message: "params cannot be empty. please supply a uid"
        }))
    }

    console.log("params: ", req.params);

    const uid = req.params.uid;

    const userRef = fs.collection('users').doc(uid);

    const doc = await userRef.get();

    if(!doc.exists){
        res.status(404).send({ 'message': 'User Not Found'});
    } else {
        const data = doc.data();
        console.log("Successfully retrieved user from db: " + data.email);
        console.log(data);
        res.status(200).send(data);
    }
      
}
/*
    user-stats:
    Weight, height, age, sex, 
    Uploads or updates user stats (post/put)
*/
exports.uploadUserStats = async (req, res, next) => {
    if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    const body = req.body;

    const uid = req.params.uid;

    const userRef = firebase.firestore().collection('users').doc(uid);

    const doc = await userRef.get();

    if(!doc.exists){
        res.status(404).send({ 'message': 'User Not Found'});
    } else {
        try{
            console.log(body);
            await userRef.set({
                "user-stats": {
                    weight: body.weight,
                    height: body.height,
                    age: body.age,
                    sex: body.sex
                }, "diet-type": body.diet },{merge: true}
            );
            console.log("Successfully uploaded user stats to db: " + doc.data().email);
            console.log(body);
            const updatedDoc = await userRef.get();
            res.status(200).send(updatedDoc.data());
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("[ERR] ", errorMessage, ": ", errorCode)
            res.status(400).send(error);    
        }
    }

}

/*
*   request body: {
        diet-type: "macros",
        food: "pizza",
        calories: 100,
        protein: 100,
        fat: 100,
        carbs: 200
}
*
*/
exports.postLog = async (req, res, next) => {
    if (!req.params) {
        return res.status(400).send(({
            message: "params cannot be empty. please supply a uid"
        }))
    } if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    console.log("params: ", req.params);

    console.log("body: ", req.body);

    const uid = req.params.uid;
    const body = req.body;
    

    const currentTime = utils.getCurrentDate(); // can probably get time object from body
    const userRef = fs.collection('users').doc(uid);

    const foodLogRef = fs.collection('food-logs').doc(uid);

    const dailyTotalRef = fs.collection('users').doc(uid).collection('daily-totals').doc(currentTime);

    const doc = await userRef.get();

    if(!doc.exists){
        res.status(404).send({ 'message': 'User Not Found'});
    } else {
        try{
            let log;
            log = new models.GeneralFoodLog(body.item,body.calories,body.fat.quantity,body.carbs.quantity,body.sugar.quantity,body.protein.quantity);
            console.log(log.getLog());
            await foodLogRef.collection(currentTime).add(log.getLog(),{merge: true});
            console.log("Successfully posted log to user food log: " + doc.data().email);
           
            //update daily totals
            dailyTotalRef.get() 
                .then(docSnapshot => {
                    //check if daily totals doc for day exists
                    //TO DO: Can add if statements to create different fields for different diets
                    if(docSnapshot.exists) {
                        dailyTotalRef.update({
                            dailyCalories: firebase.firestore.FieldValue.increment(body.calories),
                            dailyFat: firebase.firestore.FieldValue.increment(body.fat.quantity),
                            dailyCarbs: firebase.firestore.FieldValue.increment(body.carbs.quantity),
                            dailySugar: firebase.firestore.FieldValue.increment(body.sugar.quantity),
                            dailyProtein: firebase.firestore.FieldValue.increment(body.protein.quantity)
                        })
                        console.log("[INFO] Successfully updated daily totals for: " + currentTime)
                    } else {
                        dailyTotalRef.set({
                            dailyCalories: firebase.firestore.FieldValue.increment(body.calories),
                            dailyFat: firebase.firestore.FieldValue.increment(body.fat.quantity),
                            dailyCarbs: firebase.firestore.FieldValue.increment(body.carbs.quantity),
                            dailySugar: firebase.firestore.FieldValue.increment(body.sugar.quantity),
                            dailyProtein: firebase.firestore.FieldValue.increment(body.protein.quantity)
                        })
                        console.log("[INFO] Successfully updated daily totals for: " + currentTime)
                        console.log("[INFO] Successfully created daily totals for: " + currentTime)
                    }
                });

            // const updatedDoc = await foodLogRef.collection(currentTime).get();
            res.status(200).send({"Message": "Successfully logged food data and updated daily totals"});
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("[ERR] ", errorMessage, ": ", errorCode);
            res.status(400).send(error);    
        }
    }
}

exports.getLogs = async (req, res, next) => {
    if (!req.params) {
        return res.status(400).send(({
            message: "params cannot be empty. please supply a uid"
        }))
    } if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    console.log("params: ", req.params);

    console.log("body: ", req.body);

    const uid = req.params.uid;
    const date = req.params.date;

    const currentTime = utils.getCurrentDate(); // can probably get time object from body

    const foodLogRef = fs.collection('food-logs').doc(uid).collection(date);
    const snapshot = await foodLogRef.get();
    if(!snapshot.size){
        res.status(404).send({ 'message': 'User has no food logs for date specified', date});
    } else {
        try{
            let logResults = []
            snapshot.forEach(doc => {
                logResults.push({"doc_id": doc.id , "data": doc.data()});
              });
            

            // const updatedDoc = await foodLogRef.collection(currentTime).get();
            res.status(200).send({"Message": "Successfully retrieved food data logs", "food-log": logResults});
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("[ERR] ", errorMessage, ": ", errorCode);
            res.status(400).send(error);    
        }
    }
}

exports.deleteLog = async (req, res, next) => {
    if (!req.params) {
        return res.status(400).send(({
            message: "params cannot be empty. please supply a uid"
        }))
    } if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    console.log("params: ", req.params);

    console.log("body: ", req.body);

    const uid = req.params.uid;
    const date = req.params.date;
    const doc_id = req.params.doc_id

    const currentTime = utils.getCurrentDate(); // can probably get time object from body

    const dailyTotalRef = fs.collection('users').doc(uid).collection('daily-totals').doc(date);

    const foodLogRef = fs.collection('food-logs').doc(uid).collection(date);
    const snapshot = await foodLogRef.get();
    if(!snapshot.size){
        res.status(404).send({ 'message': 'User has no food logs for date specified', date});
    } else {
        try{
            const foodLogDoc = await foodLogRef.doc(doc_id).get()
            const foodLog = foodLogDoc.data()
            console.log("[INFO] Retrieved Food Log: ", foodLog)
            //TODO: add if statements for different diets
            dailyTotalRef.update({dailyCalories: firebase.firestore.FieldValue.increment(-foodLog.calories)})
            
            await foodLogRef.doc(doc_id).delete();
            console.log("[INFO] Successfully deleted food log with id: ", doc_id)

            // const updatedDoc = await foodLogRef.collection(currentTime).get();
            res.status(200).send({"Message": `Successfully deleted food log with id: ${doc_id}`});
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("[ERR] ", errorMessage, ": ", errorCode);
            res.status(400).send(error);    
        }
    }
}

exports.getDailyTotals = async (req, res, next) => {
    if (!req.params) {
        return res.status(400).send(({
            message: "params cannot be empty. please supply a uid"
        }))
    } if(!req.body) {
        return res.status(400).send(({
            message: "body cannot be empty"
        }))
    }

    console.log("params: ", req.params);

    console.log("body: ", req.body);

    const uid = req.params.uid;
    const date = req.params.date;

    const currentTime = utils.getCurrentDate(); // can probably get time object from body

    const dailyTotalRef = fs.collection('users').doc(uid).collection('daily-totals').doc(date);
    const doc = await dailyTotalRef.get();
    if(!doc.exists){
        res.status(404).send({ 'message': 'User has no daily totals for date specified', date});
    } else {
        try{
            
            // const updatedDoc = await foodLogRef.collection(currentTime).get();
            res.status(200).send({"Message": "Successfully retrieved food data logs", "daily-totals": doc.data()});
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("[ERR] ", errorMessage, ": ", errorCode);
            res.status(400).send(error);    
        }
    }
}

