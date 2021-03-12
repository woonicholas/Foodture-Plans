
export class RecFoodData {
	product_name:string;
	calories: string;
    carbs: number;
    fat: number;
    protein: number;
    sugar: number;
    // name: String;


	constructor(data) {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		this.product_name = data["product_name"];
        this.calories = Number(data["calories"]).toFixed(2);
        this.carbs = data["carbohydrates_100g"].toFixed(2);
        this.fat = data["fat_100g"].toFixed(2);
        this.protein = data["proteins_100g"].toFixed(2);
		this.sugar = data["sugars_100g"].toFixed(2);
        // this.name = data["data"]["item"];
	}


}
