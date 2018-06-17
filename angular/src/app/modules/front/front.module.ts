import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LandingComponent],
  exports: [
    LandingComponent,
  ]
})
export class FrontModule { }
