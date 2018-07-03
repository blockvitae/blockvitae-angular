import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Blockvitae } from '../../../../interfaces/interface';

@Component({
  selector: 'app-workexp-dialog',
  templateUrl: './workexp-dialog.component.html',
  styleUrls: ['./workexp-dialog.component.scss']
})
export class WorkexpDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public userWork: Blockvitae.UserWorkExp;
  ) { }

}
