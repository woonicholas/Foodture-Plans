import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { UserData } from '../data/user-data';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {
  public uid: String
  public userData: any

  constructor(private router:Router, private DbService: DbService) {

   }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
    this.fetchUser();
  }

  async fetchUser() {
    this.userData = await this.DbService.getUserStats(this.uid);
    console.log(this.userData)
  }

}
