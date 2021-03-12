import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IdmService } from '../services/idm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  username:string;
  password:string;

  constructor(private router:Router, private modalCtrl:ModalController, private IdmService: IdmService) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onRegisterSubmit(){
    this.modalCtrl.dismiss();
    this.IdmService.signUp(this.username, this.password);
    console.log("Register Success")
    this.router.navigate(['onboarding-one'])
  }

}
