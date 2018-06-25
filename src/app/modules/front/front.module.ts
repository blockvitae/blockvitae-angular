import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { ExtraModule } from '../extra/extra.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ExtraModule
  ],
  declarations: [LandingComponent, SignupComponent, LoginComponent],
  exports: [
    LandingComponent,
    SignupComponent,
    LoginComponent,
  ]
})
export class FrontModule { }
