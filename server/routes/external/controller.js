const config = require('dotenv').config()
const axios = require('axios');

exports.getSingleIngrNutrition = async (req, res, next) => {
    if(!Object.keys(req.query).length) {
        return res.status(400).send(({
            message: "query cannot be empty. please supply an ingredient and quantity"
        }))
    }
    const ingr = req.query.ingredient
    const quantity = req.query.quantity
    console.log(req.query);
    try{
        const response = await axios.get(`${process.env.EDAMAM_NUTRITION_BASE_URL}?app_id=${process.env.EDAMAM_NUTRITION_APP_ID}&app_key=${process.env.EDAMAM_NUTRITION_APP_KEY}&` +
            encodeURI(`ingr=${quantity} ${ingr}`));
        let res_body = {
            item: `${quantity} ${ingr}`,
            calories: response.data.calories,
            fat: response.data.totalNutrients.FAT,
            carbs: response.data.totalNutrients.CHOCDF,
            sugar: response.data.totalNutrients.SUGAR,
            protein: response.data.totalNutrients.PROCNT,
        }
        res.status(200).send(res_body);
    } catch(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("[ERR] ", errorMessage, ": ", errorCode)
        res.status(400).send(error)
    }
}

//Included recipe filters are: balanced, high protein, low-fat, low-carb, vegan, 
//vegetarian, sugar-conscious, peanut-free, tree-nut-free, alcohol-free
exports.getFoodRecommendation = async (req, res, next) => {
    const query = req.body.query
    if(!query) {
        return res.status(400).send(({
            message: "body cannot be empty. please supply a query"
        }))
    }
    
    console.log(req.body);
    
    let query_string = `${process.env.EDAMAM_RECIPE_BASE_URL}?app_id=${process.env.EDAMAM_RECIPE_APP_ID}&app_key=${process.env.EDAMAM_RECIPE_APP_KEY}&` + encodeURI(`q=${query}`);

    //accepted: balanced, high-protein, low-fat, low-carb
    if(req.body.diet){
        (req.body.diet).forEach( d => {
            query_string = query_string + `&diet=${d}`
        })
    }
    //acccepted: sugar-consious, peanut-free, tree-nut-free, alcohol-free, vegan, vegetarian
    if(req.body.health) {
        (req.body.health).forEach( h => {
            query_string = query_string + `&health=${h}`
        })
    }
    if(req.body.maxCalories){
        query_string = query_string + `&calories=${req.body.maxCalories}`
    }

    
    try{
        console.log("[INFO] Request URL: " + query_string)
        const response = await axios.get(query_string);
        console.log(response)
        let res_body = {
            hits: response.data.hits
        }
        res.status(200).send(res_body);
    } catch(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("[ERR] ", errorMessage, ": ", errorCode)
        res.status(400).send(error)
    }
}