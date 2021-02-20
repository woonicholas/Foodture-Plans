"use strict"

class GeneralFoodLog {
    constructor(food, calories, fat, carbs, sugar, protein){
        this.food = food;
        this.calories = calories;
        this.fat = fat;
        this.carbs = carbs;
        this.sugar = sugar;
        this.protein = protein;
    }
    getLog(){
        return {
            item: this.food,
            calories: this.calories,
            fat: this.fat,
            carbs: this.carbs,
            sugar: this.sugar,
            protein: this.protein
        }
    }
}

class calorieDietLog {
    constructor(food, calories){
        this.food = food;
        this.calories = calories;
    }
    getLog(){
        return {
            food: this.food,
            calories: this.calories
        }
    }
}

module.exports = {
    calorieDietLog: calorieDietLog,
    GeneralFoodLog: GeneralFoodLog,
}