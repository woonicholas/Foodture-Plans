import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  baseUrl: string = 'http://localhost:5000';
  constructor() { }

  async getFoodRec(uid) {
    const result = await fetch(`${this.baseUrl}/getRecommendation/${uid}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log("shi")
    console.log(result);
    return result;
  }
}
