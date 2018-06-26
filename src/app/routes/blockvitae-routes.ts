import { LoginComponent } from './../modules/front/login/login.component';
import { SignupComponent } from './../modules/front/signup/signup.component';
import { LandingComponent } from './../modules/front/landing/landing.component';
import { Routes } from '@angular/router';
import { ResumeComponent } from '../modules/dashboard/resume/resume.component';

export const blockvitaeRoutes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  // not using route guard for searching username
  // because metamask injects web3 provider after DOM loads
  // and blockchain can't be accessed without web3 instance
  {path: 'resume/:username', component: ResumeComponent},
  {path: '', component: LandingComponent},
];