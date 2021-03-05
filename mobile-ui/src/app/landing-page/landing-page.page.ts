import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodLogData } from '../data/food-log-data';
import { DbService } from '../services/db.service';
import { Utils } from '../util/util';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  public showDailyTotalPage: boolean
  public uid: String
  public foodLogs: FoodLogData
  public date: string

  constructor(private router:Router, private DbService: DbService) { 
    console.log("constructing..")
    this.date = new Date().toISOString();
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);
    this.showDailyTotalPage = true;
    this.fetchFoodLogs();
    this.date = new Date().toISOString();
  }

  async fetchFoodLogs(){
    this.foodLogs = await this.DbService.getFoodLogs(this.uid,Utils.formatDate(this.date));
    console.log(this.foodLogs);
  }

  segmentChanged(){
    this.showDailyTotalPage = !this.showDailyTotalPage;
  }

  forwardDateOnClick() {
    var result = new Date(this.date);
    result.setDate(result.getDate() + 1);
    this.date = result.toISOString();
  }

  backDateOnClick() {
    var result = new Date(this.date);
    result.setDate(result.getDate() - 1);
    this.date = result.toISOString();
  }

  addNewOnClick(){
    this.router.navigate(['food-logger-form']);
  }

}
