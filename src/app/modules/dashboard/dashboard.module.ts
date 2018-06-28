import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ResumeComponent } from './resume/resume.component';
import { MetamaskWarningDialogComponent } from './dialog/metamask-warning-dialog/metamask-warning-dialog.component';
import { ProfileDialogComponent } from './dialog/profile-dialog/profile-dialog.component';
import { IntroductionDialogComponent } from './dialog/introduction-dialog/introduction-dialog.component';
import { SkillsDialogComponent } from './dialog/skills-dialog/skills-dialog.component';
import { WorkexpDialogComponent } from './dialog/workexp-dialog/workexp-dialog.component';
import { ProjectsDialogComponent } from './dialog/projects-dialog/projects-dialog.component';

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
    IntroductionDialogComponent, 
    SkillsDialogComponent, 
    WorkexpDialogComponent, 
    ProjectsDialogComponent
  ],
  entryComponents: [
    MetamaskWarningDialogComponent, 
    ProfileDialogComponent,
    IntroductionDialogComponent,
    SkillsDialogComponent,
    WorkexpDialogComponent,
    ProjectsDialogComponent
  ]
})
export class DashboardModule { }
