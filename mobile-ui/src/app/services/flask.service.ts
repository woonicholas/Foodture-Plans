import { Injectable } from '@angular/core';
import {RecFoodData} from '../data/rec-food-data';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  baseUrl: string = 'http://localhost:5000';
  constructor() { }
  
  async getFoodRec(uid) {
    const result = await fetch(`${this.baseUrl}/getRecommendation/${uid}`,{
      method: "get",
    }).then(r => r.json()).then((data) => {
      return data["recommendations"].map( d => new RecFoodData(d)) //data["food-log"].map(d => new FoodLogData(d))
    }).catch(r => {
      console.log(r)
    })
    return result;
  }
}
