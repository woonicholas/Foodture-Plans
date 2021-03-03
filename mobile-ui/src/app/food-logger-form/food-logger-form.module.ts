import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodLoggerFormPageRoutingModule } from './food-logger-form-routing.module';

import { FoodLoggerFormPage } from './food-logger-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodLoggerFormPageRoutingModule
  ],
  declarations: [FoodLoggerFormPage]
})
export class FoodLoggerFormPageModule {}
