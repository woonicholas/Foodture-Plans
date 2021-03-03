import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'onboarding-one',
    loadChildren: () => import('./onboarding-one/onboarding-one.module').then( m => m.OnboardingOnePageModule)
  },
  {
    path: 'onboarding-two',
    loadChildren: () => import('./onboarding-two/onboarding-two.module').then( m => m.OnboardingTwoPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },  {
    path: 'food-log',
    loadChildren: () => import('./food-log/food-log.module').then( m => m.FoodLogPageModule)
  },
  {
    path: 'food-logger-form',
    loadChildren: () => import('./food-logger-form/food-logger-form.module').then( m => m.FoodLoggerFormPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
