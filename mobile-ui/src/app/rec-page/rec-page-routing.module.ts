import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecPagePage } from './rec-page.page';

const routes: Routes = [
  {
    path: '',
    component: RecPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecPagePageRoutingModule {}
