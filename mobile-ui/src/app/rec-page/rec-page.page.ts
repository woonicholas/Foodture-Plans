import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { Utils } from '../util/util';
import { RecFoodData } from '../data/rec-food-data';
import { FlaskService } from '../services/flask.service'; 

@Component({
  selector: 'app-rec-page',
  templateUrl: './rec-page.page.html',
  styleUrls: ['./rec-page.page.scss'],
})
export class RecPagePage implements OnInit {
  public recFood: Array<RecFoodData>
  public uid: String

  constructor(private router:Router, private FlaskService: FlaskService) {
    // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
   }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    // console.log(this.uid);

    this.recFood = await this.FlaskService.getFoodRec(this.uid);
    console.log(this.recFood)
  }

  // loadData(event){

  // }

}
