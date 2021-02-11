import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {

  constructor(private modalCtrl:ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
  onRegisterSubmit(){
    console.log("Register Success")
  }

}
