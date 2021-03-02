const controller = require('./controller');
const external = require('express').Router();


external.get('/getSingleIngrNutrition',controller.getSingleIngrNutrition)
external.post('/getFoodRecommendation', controller.getFoodRecommendation)
module.exports = external;