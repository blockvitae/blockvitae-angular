import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
  ],
  declarations: [
    LandingComponent, 
    SignupComponent, 
    LoginComponent, 
    PageNotFoundComponent
  ],
  exports: [
    LandingComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent
  ]
})
export class FrontModule { }
