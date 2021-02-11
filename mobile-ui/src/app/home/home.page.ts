import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import {LoginModalComponent} from './../login-modal/login-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalCtrl: ModalController) {}
  
  async openLoginModal(){
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent
    });
    
    await modal.present();
  }

  async openRegisterModal(){
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent
    })
    
    await modal.present();
  }



}
