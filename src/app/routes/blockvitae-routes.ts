import { LoginComponent } from './../modules/front/login/login.component';
import { SignupComponent } from './../modules/front/signup/signup.component';
import { LandingComponent } from './../modules/front/landing/landing.component';
import { Routes } from '@angular/router';

export const blockvitaeRoutes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LandingComponent},
];