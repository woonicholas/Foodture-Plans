import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Utils } from '../util/util';
import { FlaskService } from '../services/flask.service'; 

@Component({
  selector: 'app-rec-page',
  templateUrl: './rec-page.page.html',
  styleUrls: ['./rec-page.page.scss'],
})
export class RecPagePage implements OnInit {
  public recFood: any
  public uid: String

  constructor(private router:Router, private FlaskService: FlaskService) { }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);

    this.recFood = await this.FlaskService.getFoodRec(this.uid);
  }

}
