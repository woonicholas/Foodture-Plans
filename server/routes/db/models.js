"use strict"

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
}