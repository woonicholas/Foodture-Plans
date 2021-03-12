import { Component, OnInit } from '@angular/core';
import { ExternalApiService } from '../services/external-api.service';
import { DbService } from '../services/db.service';
import { FoodLogData } from '../data/food-log-data';
import { Utils } from '../util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-logger-form',
  templateUrl: './food-logger-form.page.html',
  styleUrls: ['./food-logger-form.page.scss'],
})
export class FoodLoggerFormPage implements OnInit {
  public ingredient: String
  public uid: String
  public foodLogs: Array<FoodLogData>
  public date: string

  public quantity: number
  constructor( private router:Router, private ExternalApiService: ExternalApiService, private DbService: DbService) { 
    this.date = new Date().toISOString();
  }

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
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
    // this.foodLogs = await this.DbService.getFoodLogs(this.uid,Utils.formatDate(this.date));

  }

  returnOnClick(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['landing-page']);
  }
}
