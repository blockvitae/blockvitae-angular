import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ResumeComponent } from './resume/resume.component';
import { MetamaskWarningDialogComponent } from './dialog/metamask-warning-dialog/metamask-warning-dialog.component';
import { ProfileDialogComponent } from './dialog/profile-dialog/profile-dialog.component';
import { IntroductionDialogComponent } from './dialog/introduction-dialog/introduction-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [
    ResumeComponent, 
    MetamaskWarningDialogComponent, 
    ProfileDialogComponent, 
    IntroductionDialogComponent
  ],
  entryComponents: [
    MetamaskWarningDialogComponent, 
    ProfileDialogComponent,
    IntroductionDialogComponent
  ]
})
export class DashboardModule { }
