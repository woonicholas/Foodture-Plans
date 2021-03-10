import { Component, OnInit } from '@angular/core';
import { ExternalApiService } from '../services/external-api.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-food-logger-form',
  templateUrl: './food-logger-form.page.html',
  styleUrls: ['./food-logger-form.page.scss'],
})
export class FoodLoggerFormPage implements OnInit {
  public ingredient: String
  public quantity: number
  constructor( private ExternalApiService: ExternalApiService, private DbService: DbService) { 
    
  }

  ngOnInit() {
  }

  getCurrentDate = () => {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');

};

  async getNutrition(){
    const nutrition = await this.ExternalApiService.getNutrition(this.ingredient,this.quantity);
    console.log(nutrition)
    const post = await this.DbService.postFoodLog(localStorage.getItem("uid"),nutrition)
    console.log(post)
  }

}
