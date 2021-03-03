import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodLoggerFormPage } from './food-logger-form.page';

const routes: Routes = [
  {
    path: '',
    component: FoodLoggerFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodLoggerFormPageRoutingModule {}
