import { LoginComponent } from './../modules/front/login/login.component';
import { SignupComponent } from './../modules/front/signup/signup.component';
import { LandingComponent } from './../modules/front/landing/landing.component';
import { Routes } from '@angular/router';
import { ResumeComponent } from '../modules/dashboard/resume/resume.component';

export const blockvitaeRoutes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'resume', component: ResumeComponent},
  {path: '', component: LandingComponent},
];