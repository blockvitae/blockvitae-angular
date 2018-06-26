import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ResumeComponent } from './resume/resume.component';
import { ProfileDialogComponent } from './dialog/profile-dialog/profile-dialog.component';
import { MetamaskWarningDialogComponent } from './dialog/metamask-warning-dialog/metamask-warning-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [ResumeComponent, ProfileDialogComponent, MetamaskWarningDialogComponent],
  entryComponents: [MetamaskWarningDialogComponent]
})
export class DashboardModule { }
