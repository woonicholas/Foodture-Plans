import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-onboarding-one',
  templateUrl: './onboarding-one.page.html',
  styleUrls: ['./onboarding-one.page.scss'],
})
export class OnboardingOnePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onClickSubmit(){
    console.log("Login Success")
    this.router.navigate(['onboarding-two'])
  }

}
