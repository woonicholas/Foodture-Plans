import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdmService {
  baseUrl: string = 'http://localhost:3001';

  constructor(){}

  //signin endpoint 
  async signIn(username, password) {
    const body = {
      "email": username, 
      "password": password
    }
    console.log(JSON.stringify(body))
    const result = await fetch(this.baseUrl + "/idm/signin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(r => r.json()).then((data) => {
      return data
    })
    return result;
  }

  //signup endpoint
  signUp(username, password){
    const body = {
      "email": username, 
      "password": password
    }
    console.log(JSON.stringify(body))
    fetch(this.baseUrl + "/idm/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((data) => {
      console.log(data);
      return data
    })
    return null;
  }
}
