import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IdmService } from '../services/idm.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  username:string;
  password:string;

  constructor(private modalCtrl:ModalController, private router:Router, private IdmService: IdmService) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

//need to check login and pw 
  onLoginSubmit(){
    this.IdmService.signIn(this.username, this.password);
    console.log("Login Success");
    this.modalCtrl.dismiss();
    this.router.navigate(['onboarding-one'])
  }

}
