import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-onboarding-two',
  templateUrl: './onboarding-two.page.html',
  styleUrls: ['./onboarding-two.page.scss'],
})
export class OnboardingTwoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onClickSubmit(){
    console.log("Login Success")
    this.router.navigate(['landing-page'])
  }

}
