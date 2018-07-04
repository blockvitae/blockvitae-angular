import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Blockvitae } from '../../../../interfaces/interface';

@Component({
  selector: 'app-projects-dialog',
  templateUrl: './projects-dialog.component.html',
  styleUrls: ['./projects-dialog.component.scss']
})
export class ProjectsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public userProject: Blockvitae.UserProject
  ) { }
}
