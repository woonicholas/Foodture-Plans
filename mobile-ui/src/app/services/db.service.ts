import { Injectable } from '@angular/core';
import { DailyTotalData } from '../data/daily-total-data';
import {FoodLogData} from '../data/food-log-data';
import { UserData } from '../data/user-data';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  baseUrl: string = 'http://localhost:3001';
  // flaskUrl: string = 'http://localhost:5000';
  constructor() { }

  async getFoodLogs(uid,date) {
    const result = await fetch(`${this.baseUrl}/db/getLogs/${uid}/${date}`,{
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.json()).then((data) => {
      return data["food-log"].map(d => new FoodLogData(d))
    }).catch(r => {
      console.log(r)
    })
    return result;
  }

  async deleteFoodLog(doc_id) {
    const result = await fetch(`${this.baseUrl}/db/deleteLog/${doc_id}`,{
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.json()).then((data) => {
      return data;
    }).catch(r => {
      console.log(r)
    })
    return result;
  }

  async postFoodLog(doc_id,log) {
    const result = await fetch(`${this.baseUrl}/db/postLog/${doc_id}`,{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(log)
    }).then(r => r.json()).then((data) => {
      return data;
    }).catch(r => {
      console.log(r)
      return [];
    })
    return result;
  }

  async getDailyTotals(uid,date){
    const result = await fetch(`${this.baseUrl}/db/getDailyTotals/${uid}/${date}`,{
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then( r=>r.json()).then((data) =>{
      return new DailyTotalData(data); 
    }).catch(r=>{
      return new DailyTotalData()
    })
    return result;
  }

  async getUserStats(uid) {
    const result = await fetch(`${this.baseUrl}/db/getUser/${uid}`,{
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then( r=>r.json()).then((data) =>{
      return new UserData(data); 
    }).catch(r=>{
      console.log(r)
    })
    return result;
  }

  // async getRecommendation(uid){
  //   const result = await fetch(`${this.baseUrl}`)
  // }

}
