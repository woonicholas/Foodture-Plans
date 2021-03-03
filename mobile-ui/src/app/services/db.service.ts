import { Injectable } from '@angular/core';
import {FoodLogData} from '../data/food-log-data';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  baseUrl: string = 'http://localhost:3001';
  constructor() { }

  async getFoodLogs(uid) {
    const result = await fetch(`${this.baseUrl}/db/getLogs/${uid}/03-02-2021`,{
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

}
