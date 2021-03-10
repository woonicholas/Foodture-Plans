

export class DailyTotalData {
	dailyCalories: number;
    dailyCarbs: number;
    dailyFat: number;
    dailyProtein: number;


	constructor(data = null) {
      if(data){
        this.dailyCalories = data["daily-totals"]["dailyCalories"].toFixed(2);
        this.dailyCarbs = data["daily-totals"]["dailyCarbs"].toFixed(2);
        this.dailyFat = data["daily-totals"]["dailyFat"].toFixed(2);
        this.dailyProtein = data["daily-totals"]["dailyProtein"].toFixed(2);
      } else {
        console.log("its null!")
        this.dailyCalories = 0
        this.dailyCarbs = 0
        this.dailyFat = 0
        this.dailyProtein = 0
      }
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
