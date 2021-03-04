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


  constructor(private router:Router, private DbService: DbService) { 
    console.log("constructing..")
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);
  
    this.showDailyTotalPage = true;
    this.foodLogs = await this.DbService.getFoodLogs(this.uid);
    this.dailyTotalData = await this.DbService.getDailyTotals(this.uid);
    console.log(this.dailyTotalData);
    console.log(this.foodLogs);
  }

  segmentChanged(){
    this.showDailyTotalPage = !this.showDailyTotalPage;
    // console.log(this.daytimeSleepinessData);
    // console.log(this.sleepData);
  }

}
