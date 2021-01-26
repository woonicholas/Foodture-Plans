import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {

  constructor(private modalCtrl:ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onLoginSubmit(){
    console.log("Login Success")
  }

}
