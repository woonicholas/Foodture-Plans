import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  baseUrl: string = 'http://localhost:3001';
  constructor() { }

  async getNutrition(ingredient, quantity) {
    const result = await fetch(`${this.baseUrl}/external/getSingleIngrNutrition?ingredient=${ingredient}&quantity=${quantity}`,{
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.json()).then((data) => {
      return data
    }).catch(r => {
      console.log(r)
    })
    return result;
  }
}
