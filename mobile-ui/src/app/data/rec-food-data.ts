
export class RecFoodData {
	// doc_id:string;
	calories: number;
    carbs: number;
    fat: number;
    protein: number;
    sugar: number;
    name: String;


	constructor(data) {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		// this.doc_id = data.doc_id;
        this.calories = data["data"]["calories"].toFixed(2);
        this.carbs = data["data"]["carbs"].toFixed(2);
        this.fat = data["data"]["fat"].toFixed(2);
        this.protein = data["data"]["protein"].toFixed(2);
		this.sugar = data["data"]["sugar"].toFixed(2);
        this.name = data["data"]["item"];
	}

	getMacros():Object {
		return ({
            calories: this.calories,
            carbs: this.carbs,
            fat: this.fat,
            protein: this.protein,
            sugar: this.sugar
        })
	}

    getName():String {
        return this.name;
    }


}
