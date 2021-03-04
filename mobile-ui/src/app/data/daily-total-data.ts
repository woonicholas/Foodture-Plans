

export class DailyTotalData {
	dailyCalories: number;
    dailyCarbs: number;
    dailyFat: number;
    dailyProtein: number;

	constructor(data) {
        this.dailyCalories = data["daily-totals"]["dailyCalories"].toFixed(2);
        this.dailyCarbs = data["daily-totals"]["dailyCarbs"].toFixed(2);
        this.dailyFat = data["daily-totals"]["dailyFat"].toFixed(2);
        this.dailyProtein = data["daily-totals"]["dailyProtein"].toFixed(2);
        // this.objectModel = objectModel; 
	}

	getDailyCalories():number {
		return this.dailyCalories
    }
    
    getDailyCarbs():number {
		return this.dailyCarbs
    }
    
    getDailyFats():number {
		return this.dailyFat
    }
    
    getDailyProteins():number {
		return this.dailyProtein
	}

}
