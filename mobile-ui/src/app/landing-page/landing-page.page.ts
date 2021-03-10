import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodLogData } from '../data/food-log-data';
import { DbService } from '../services/db.service';
import { DailyTotalData } from '../data/daily-total-data';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  public showDailyTotalPage: boolean
  public uid: String
  public foodLogs: FoodLogData
  public dailyTotalData: any
  public calPct: number
  public carbPct: number
  public proteinPct: number
  public fatPct: number


  constructor(private router:Router, private DbService: DbService) { 
    console.log("constructing..")
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);
  
    this.showDailyTotalPage = true;
    this.foodLogs = await this.DbService.getFoodLogs(this.uid);
    this.dailyTotalData = await this.DbService.getDailyTotals(this.uid);
 
    //set daily percentage bar numbers need to be changed later with rec system 
    this.calPct = this.dailyTotalData.dailyCalories/2000.00
    this.carbPct = this.dailyTotalData.dailyCarbs/500.00
    this.proteinPct = this.dailyTotalData.dailyProtein/250.00
    this.fatPct = this.dailyTotalData.dailyFat/80

    console.log(this.dailyTotalData);
    console.log(this.foodLogs);
  }

  segmentChanged(){
    this.showDailyTotalPage = !this.showDailyTotalPage;
    // console.log(this.daytimeSleepinessData);
    // console.log(this.sleepData);
  }

}
