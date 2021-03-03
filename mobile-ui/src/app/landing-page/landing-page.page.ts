import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  public segmentFlag: boolean
  public uid: String
  constructor() { 
    console.log("constructing..")
  }

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);
    this.segmentFlag = true;
  }

  segmentChanged(){
    this.segmentFlag = !this.segmentFlag;
    // console.log(this.daytimeSleepinessData);
    // console.log(this.sleepData);
  }

}
