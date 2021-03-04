import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecPagePageRoutingModule } from './rec-page-routing.module';

import { RecPagePage } from './rec-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecPagePageRoutingModule
  ],
  declarations: [RecPagePage]
})
export class RecPagePageModule {}
