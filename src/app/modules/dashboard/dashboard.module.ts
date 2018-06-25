import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ResumeComponent } from './resume/resume.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [ResumeComponent]
})
export class DashboardModule { }
