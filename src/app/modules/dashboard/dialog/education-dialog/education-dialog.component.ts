import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Blockvitae } from '../../../../interfaces/interface';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.scss']
})
export class EducationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public userEdu: Blockvitae.UserEducation
  ) { }
}
