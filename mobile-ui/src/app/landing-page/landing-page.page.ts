import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodLogData } from '../data/food-log-data';
import { DbService } from '../services/db.service';
import { Utils } from '../util/util';
import { DailyTotalData } from '../data/daily-total-data';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  public showDailyTotalPage: boolean
  public uid: String
  public foodLogs: Array<FoodLogData>
  public date: string
  public dailyTotalData: any
  public calPct: number
  public carbPct: number
  public proteinPct: number
  public fatPct: number
  public test: number


  constructor(private router:Router, private DbService: DbService) { 
    console.log("constructing..")
    // this.foodLogs = this.DbService.getFoodLogs(this.uid,Utils.formatDate(this.date));
    this.date = new Date().toISOString();
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);
  
    this.showDailyTotalPage = true;
    this.foodLogs = await this.DbService.getFoodLogs(this.uid,Utils.formatDate(this.date));
    this.dailyTotalData = await this.DbService.getDailyTotals(this.uid,Utils.formatDate(this.date));
 
    
    //set daily percentage bar numbers need to be changed later with rec system 

    // console.log("test") 
    // console.log("cal" + this.calPct);
    this.fetchLogs()
    
    this.date = new Date().toISOString();
  }

  async fetchFoodLogs(){
    this.foodLogs = await this.DbService.getFoodLogs(this.uid,Utils.formatDate(this.date));
    console.log(this.foodLogs);
  }

  async fetchDailyTotal(){
    this.dailyTotalData = await this.DbService.getDailyTotals(this.uid,Utils.formatDate(this.date));
    //.45 carbs .35 protein .2 fat 
    this.calPct = this.dailyTotalData.dailyCalories/2600.00
    if(this.calPct > 1){
      this.calPct = 1;
    }
    this.carbPct = this.dailyTotalData.dailyCarbs/1170.00
    if(this.carbPct > 1){
      this.carbPct = 1;
    }
    this.proteinPct = this.dailyTotalData.dailyProtein/910.00
    if(this.proteinPct > 1){
      this.proteinPct = 1;
    }
    this.fatPct = this.dailyTotalData.dailyFat/520.00
    if(this.fatPct > 1){
      this.fatPct = 1;
    }
    console.log(this.dailyTotalData);
  }

  fetchLogs(){
    this.fetchDailyTotal()
    this.fetchFoodLogs()
  }

  segmentChanged(){
    console.log("click")
    this.showDailyTotalPage = !this.showDailyTotalPage;
    this.fetchLogs();
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
    console.log("clicked")
    
    this.router.navigate(['food-logger-form']);
    
  }

}
