import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodLogData } from '../data/food-log-data';
import { DbService } from '../services/db.service';
import { Utils } from '../util/util';
import { DailyTotalData } from '../data/daily-total-data';
import { ThrowStmt } from '@angular/compiler';


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


  constructor(private router:Router, private DbService: DbService) { 
    console.log("constructing..")
    this.date = new Date().toISOString();
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);
  
    this.showDailyTotalPage = true;
    this.fetchLogs()
    this.date = new Date().toISOString();
  }

  async fetchFoodLogs(){
    this.foodLogs = await this.DbService.getFoodLogs(this.uid,Utils.formatDate(this.date));
    console.log(this.foodLogs);
  }

  async fetchDailyTotal(){
    this.dailyTotalData = await this.DbService.getDailyTotals(this.uid,Utils.formatDate(this.date));
    console.log(this.dailyTotalData);
  }

  fetchLogs(){
    this.fetchDailyTotal()
    this.fetchFoodLogs()
  }

  segmentChanged(){
    console.log("click")
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
